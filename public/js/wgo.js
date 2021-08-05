/*!
 * Copyright (c) 2013 Jan Prokop
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this 
 * software and associated documentation files (the "Software"), to deal in the Software 
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
 * to whom the Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
/* WGo.js 2.3.1 */
 
(function(window, undefined) {

"use strict";

var scripts= document.getElementsByTagName('script');
var path= scripts[scripts.length-1].src.split('?')[0];      // remove any ?query
var mydir= path.split('/').slice(0, -1).join('/')+'/';  

/**
 * Main namespace - it initializes WGo in first run and then execute main function. 
 * You must call WGo.init() if you want to use library, without calling WGo.
 */
 
var WGo = {
	// basic information
	version: "2.3.1",
	
	// constants for colors (rather use WGo.B or WGo.W)
	B: 1,
	W: -1,

	// if true errors will be shown in dialog window, otherwise they will be ignored
	ERROR_REPORT: true,
	DIR: mydir,
	
	// Language of player, you can change this global variable any time. Object WGo.i18n.<your lang> must exist.
	lang: "en",
	
	// Add terms for each language here 
	i18n: {
		en: {}
	}
}

// browser detection - can be handy
var nua = navigator.userAgent;
WGo.opera = nua.search(/(opera)(?:.*version)?[ \/]([\w.]+)/i) != -1;
WGo.webkit = nua.search(/(webkit)[ \/]([\w.]+)/i) != -1;
WGo.msie = nua.search(/(msie) ([\w.]+)/i) != -1;
WGo.mozilla = nua.search(/(mozilla)(?:.*? rv:([\w.]+))?/i) != -1 && !WGo.webkit && !WGo.msie;
WGo.android = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);
WGo.androidChrome38 = WGo.android && nua.indexOf('Chrome/38') > -1;

// translating function
WGo.t = function(str) {
	var loc = WGo.i18n[WGo.lang][str] || WGo.i18n.en[str];
	if(loc) {
		for(var i = 1; i < arguments.length; i++) {
			loc = loc.replace("$", arguments[i]);
		}
		return loc;
	}
	return str;
}

// helping function for class inheritance
WGo.extendClass = function(parent, child) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.super = parent;
	
	return child;
};

// helping function for class inheritance
WGo.abstractMethod = function() {
	throw Error('unimplemented abstract method');
};

// helping function for deep cloning of simple objects,
WGo.clone = function(obj) {
	if(obj && typeof obj == "object") {
		var n_obj = obj.constructor == Array ? [] : {};
		
		for(var key in obj) {
			if(obj[key] == obj) n_obj[key] = obj;
			else n_obj[key] = WGo.clone(obj[key]);
		}
		
		return n_obj;
	}
	else return obj;
}

// filter html to avoid XSS
WGo.filterHTML = function(text) {
	if(!text || typeof text != "string") return text;
	return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

//---------------------- WGo.Board -----------------------------------------------------------------------------

/**
 * Board class constructor - it creates a canvas board
 *
 * @param elem DOM element to put in
 * @param config configuration object. It is object with "key: value" structure. Possible configurations are:
 *
 * - size: number - size of the board (default: 19)
 * - width: number - width of the board (default: 0)
 * - height: number - height of the board (default: 0)
 * - font: string - font of board writings (!deprecated)
 * - lineWidth: number - line width of board drawings (!deprecated)
 * - autoLineWidth: boolean - if set true, line width will be automatically computed accordingly to board size - this option rewrites 'lineWidth' /and it will keep markups sharp/ (!deprecated)
 * - starPoints: Object - star points coordinates, defined for various board sizes. Look at Board.default for more info.
 * - stoneHandler: Board.DrawHandler - stone drawing handler (default: Board.drawHandlers.SHELL)
 * - starSize: number - size of star points (default: 1). Radius of stars is dynamic, however you can modify it by given constant. (!deprecated)
 * - stoneSize: number - size of stone (default: 1). Radius of stone is dynamic, however you can modify it by given constant. (!deprecated)
 * - shadowSize: number - size of stone shadow (default: 1). Radius of shadow is dynamic, however you can modify it by given constant. (!deprecated)
 * - background: string - background of the board, it can be either color (#RRGGBB) or url. Empty string means no background. (default: WGo.DIR+"wood1.jpg")
 * - section: {
 *     top: number,
 *     right: number,
 *     bottom: number,
 *     left: number
 *   }
 *   It defines a section of board to be displayed. You can set a number of rows(or cols) to be skipped on each side. 
 *   Numbers can be negative, in that case there will be more empty space. In default all values are zeros.
 * - theme: Object - theme object, which defines all graphical attributes of the board. Default theme object is "WGo.Board.themes.default". For old look you may use "WGo.Board.themes.old".
 *
 * Note: properties lineWidth, autoLineWidth, starPoints, starSize, stoneSize and shadowSize will be considered only if you set property 'theme' to 'WGo.Board.themes.old'.
 */
 
var Board = function(elem, config) {
	var config = config || {};
	
	// set user configuration
	for(var key in config) this[key] = config[key];
	
	// add default configuration
	for(var key in WGo.Board.default) if(this[key] === undefined) this[key] = WGo.Board.default[key];
	
	// add default theme variables
	for(var key in Board.themes.default) if(this.theme[key] === undefined) this.theme[key] = Board.themes.default[key];
	
	// set section if set
	this.tx = this.section.left;
	this.ty = this.section.top;
	this.bx = this.size-1-this.section.right;
	this.by = this.size-1-this.section.bottom;
	
	// init board
	this.init();
	
	// append to element
	elem.appendChild(this.element);
	
	// set initial dimensions

	// set the pixel ratio for HDPI (e.g. Retina) screens
	this.pixelRatio = window.devicePixelRatio || 1;

	if(this.width && this.height) this.setDimensions(this.width, this.height);
	else if(this.width) this.setWidth(this.width);
	else if(this.height) this.setHeight(this.height);
}

// New experimental board theme system - it can be changed in future, if it will appear to be unsuitable.
Board.themes = {};

Board.themes.old = {
	shadowColor: "rgba(32,32,32,0.5)",	
	shadowTransparentColor: "rgba(32,32,32,0)",
	shadowBlur: 0,
	shadowSize: function(board) {
		return board.shadowSize;
	},
	markupBlackColor: "rgba(255,255,255,0.8)",
	markupWhiteColor: "rgba(0,0,0,0.8)",
	markupNoneColor: "rgba(0,0,0,0.8)",
	markupLinesWidth: function(board) {
		return board.autoLineWidth ? board.stoneRadius/7 : board.lineWidth;
	},
	gridLinesWidth: 1,
	gridLinesColor: function(board) {
		return "rgba(0,0,0,"+Math.min(1, board.stoneRadius/15)+")";
	}, 
	starColor: "#000",
	starSize: function(board) {
		return board.starSize*((board.width/300)+1);
	},
	stoneSize: function(board) {
		return board.stoneSize*Math.min(board.fieldWidth, board.fieldHeight)/2;
	},
	coordinatesColor: "rgba(0,0,0,0.7)",
	font: function(board) {
		return board.font;
	},
	linesShift: 0.5
}

/** 
 * Object containing default graphical properties of a board.
 * A value of all properties can be even static value or function, returning final value.
 * Theme object doesn't set board and stone textures - they are set separately.
 */ 
 
Board.themes.default = {
	shadowColor: "rgba(62,32,32,0.5)",
	shadowTransparentColor: "rgba(62,32,32,0)",
	shadowBlur: function(board){
		return board.stoneRadius*0.1;
	},
	shadowSize: 1,
	markupBlackColor: "rgba(255,255,255,0.9)",
	markupWhiteColor: "rgba(0,0,0,0.7)",
	markupNoneColor: "rgba(0,0,0,0.7)",
	markupLinesWidth: function(board) {
		return board.stoneRadius/8;
	},
	gridLinesWidth: function(board) {
		return board.stoneRadius/15;
	},
	gridLinesColor: "#654525",
	starColor: "#531",
	starSize: function(board) {
		return (board.stoneRadius/8)+1;
	},
	stoneSize: function(board) {
		return Math.min(board.fieldWidth, board.fieldHeight)/2;
	},
	coordinatesColor: "#531",
	font: "calibri",
	linesShift: 0.25
}

var theme_variable = function(key, board) {
	return typeof board.theme[key] == "function" ? board.theme[key](board) : board.theme[key];
}

var shadow_handler = {
	draw: function(args, board) {
		var xr = board.getX(args.x),
			yr = board.getY(args.y),
			sr = board.stoneRadius;
		
		this.beginPath();
		
		var blur = theme_variable("shadowBlur", board);
		var radius = Math.max(0, sr-0.5);
		var gradient = this.createRadialGradient(xr-board.ls, yr-board.ls, radius-1-blur, xr-board.ls, yr-board.ls, radius+blur);
		
		gradient.addColorStop(0, theme_variable("shadowColor", board));
		gradient.addColorStop(1, theme_variable("shadowTransparentColor", board));
		
		this.fillStyle = gradient;
		
		this.arc(xr-board.ls, yr-board.ls, radius+blur, 0, 2*Math.PI, true);
		this.fill();
	},
	clear: function(args, board) {
		var xr = board.getX(args.x),
			yr = board.getY(args.y),
			sr = board.stoneRadius;
		this.clearRect(xr-1.1*sr-board.ls,yr-1.1*sr-board.ls, 2.2*sr, 2.2*sr);
	}
}

var get_markup_color = function(board, x, y) {
	if(board.obj_arr[x][y][0].c == WGo.B) return theme_variable("markupBlackColor", board);
	else if(board.obj_arr[x][y][0].c == WGo.W) return theme_variable("markupWhiteColor", board);
	return theme_variable("markupNoneColor", board);
}

var is_here_stone = function(board, x, y) {
	return (board.obj_arr[x][y][0] && board.obj_arr[x][y][0].c == WGo.W || board.obj_arr[x][y][0].c == WGo.B);
}

var redraw_layer = function(board, layer) {
	var handler;
	
	board[layer].clear();
	board[layer].draw(board);
	
	for(var x = 0; x < board.size; x++) {
		for(var y = 0; y < board.size; y++) {
			for(var key in board.obj_arr[x][y]) {
				if(!board.obj_arr[x][y][key].type) handler = board.stoneHandler;
				else if(typeof board.obj_arr[x][y][key].type == "string") handler = Board.drawHandlers[board.obj_arr[x][y][key].type];
				else handler = board.obj_arr[x][y][key].type;
		
				if(handler[layer]) handler[layer].draw.call(board[layer].getContext(board.obj_arr[x][y][key]), board.obj_arr[x][y][key], board);
			}
		}
	}
	
	for(var key in board.obj_list) {
		var handler = board.obj_list[key].handler;
		
		if(handler[layer]) handler[layer].draw.call(board[layer].getContext(board.obj_list[key].args), board.obj_list[key].args, board);
	}
}

// shell stone helping functions

var shell_seed;

var draw_shell_line = function(ctx, x, y, radius, start_angle, end_angle, factor, thickness) {
	ctx.strokeStyle = "rgba(64,64,64,0.2)";

	ctx.lineWidth = (radius/30)*thickness;
	ctx.beginPath();
	
	radius -= Math.max(1, ctx.lineWidth);
	
	var x1 = x + radius*Math.cos(start_angle*Math.PI);
	var y1 = y + radius*Math.sin(start_angle*Math.PI);
	var x2 = x + radius*Math.cos(end_angle*Math.PI);
	var y2 = y + radius*Math.sin(end_angle*Math.PI);
	
	var m, angle, x, diff_x, diff_y;
	if(x2 > x1) {
		m = (y2-y1)/(x2-x1);
		angle = Math.atan(m);
	}
	else if(x2 == x1) {
		angle = Math.PI/2;
	}
	else {
		m = (y2-y1)/(x2-x1);
		angle = Math.atan(m)-Math.PI;
	}

	var c = factor*radius;
	diff_x = Math.sin(angle) * c;
	diff_y = Math.cos(angle) * c;

	var bx1 = x1 + diff_x;
	var by1 = y1 - diff_y;
	
	var bx2 = x2 + diff_x;
	var by2 = y2 - diff_y;
	
	ctx.moveTo(x1,y1);
	ctx.bezierCurveTo(bx1, by1, bx2, by2, x2, y2);
	ctx.stroke();
}

var draw_shell = function(arg) {
	var from_angle = arg.angle;
	var to_angle = arg.angle;
	
	for(var i = 0; i < arg.lines.length; i++) {
		from_angle += arg.lines[i];
		to_angle -= arg.lines[i];
		draw_shell_line(arg.ctx, arg.x, arg.y, arg.radius, from_angle, to_angle, arg.factor, arg.thickness);
	}
}

// drawing handlers

Board.drawHandlers = {
	// handler for normal stones
	NORMAL: {
		// draw handler for stone layer
		stone: {
			// drawing function - args object contain info about drawing object, board is main board object
			// this function is called from canvas2D context
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius,
					radgrad;
				
				// set stone texture
				if(args.c == WGo.W) {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,sr/3,xr-sr/5,yr-sr/5,5*sr/5);
					radgrad.addColorStop(0, '#fff');
					radgrad.addColorStop(1, '#aaa');
				}
				else {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,1,xr-sr/5,yr-sr/5,4*sr/5);
					radgrad.addColorStop(0, '#666');
					radgrad.addColorStop(1, '#000');
				}
				
				// paint stone
				this.beginPath();
				this.fillStyle = radgrad;
				this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
				this.fill();
			}
		},
		// adding shadow handler
		shadow: shadow_handler,
	},
	
	PAINTED: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius,
					radgrad;
					
				if(args.c == WGo.W) {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,2,xr-sr/5,yr-sr/5,4*sr/5);
					radgrad.addColorStop(0, '#fff');
					radgrad.addColorStop(1, '#ddd');
				}
				else {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,1,xr-sr/5,yr-sr/5,4*sr/5);
					radgrad.addColorStop(0, '#111');
					radgrad.addColorStop(1, '#000');				
				}
				
				this.beginPath();
				this.fillStyle = radgrad;
				this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
				this.fill();
				
				this.beginPath();
				this.lineWidth = sr/6;
				
				if(args.c == WGo.W) {
					this.strokeStyle = '#999';
					this.arc(xr+sr/8, yr+sr/8, sr/2, 0, Math.PI/2, false);
				}
				else {
					this.strokeStyle = '#ccc';
					this.arc(xr-sr/8, yr-sr/8, sr/2, Math.PI, 1.5*Math.PI);
				}
				
				this.stroke();
			}
		},
		shadow: shadow_handler,
	},
	
	GLOW: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
					
				var radgrad;
				if(args.c == WGo.W) {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,sr/3,xr-sr/5,yr-sr/5,8*sr/5);
					radgrad.addColorStop(0, '#fff');
					radgrad.addColorStop(1, '#666');
				}
				else {
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,1,xr-sr/5,yr-sr/5,3*sr/5);
					radgrad.addColorStop(0, '#555');
					radgrad.addColorStop(1, '#000');
				}
				
				this.beginPath();
				this.fillStyle = radgrad;
				this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
				this.fill();
			},
		},
		shadow: shadow_handler,
	},
	
	SHELL: {
		stone: {
			draw: function(args, board) {
				var xr,
					yr,
					sr = board.stoneRadius;
				
				shell_seed = shell_seed || Math.ceil(Math.random()*9999999);
				
				xr = board.getX(args.x);
				yr = board.getY(args.y);
					
				var radgrad;

				if(args.c == WGo.W) {
					radgrad = "#aaa";
				}
				else {
					radgrad = "#000";
				}
				
				this.beginPath();
				this.fillStyle = radgrad;
				this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
				this.fill();
				
				// do shell magic here
				if(args.c == WGo.W) {
					// do shell magic here
					var type = shell_seed%(3+args.x*board.size+args.y)%3;
					var z = board.size*board.size+args.x*board.size+args.y;
					var angle = (2/z)*(shell_seed%z);

					if(type == 0) {
						draw_shell({
							ctx: this,
							x: xr,
							y: yr,
							radius: sr,
							angle: angle,
							lines: [0.10, 0.12, 0.11, 0.10, 0.09, 0.09, 0.09, 0.09],
							factor: 0.25,
							thickness: 1.75
						});
					}
					else if(type == 1) {
						draw_shell({
							ctx: this,
							x: xr,
							y: yr,
							radius: sr,
							angle: angle,
							lines: [0.10, 0.09, 0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06],
							factor: 0.2,
							thickness: 1.5
						});
					}
					else {
						draw_shell({
							ctx: this,
							x: xr,
							y: yr,
							radius: sr,
							angle: angle,
							lines: [0.12, 0.14, 0.13, 0.12, 0.12, 0.12],
							factor: 0.3,
							thickness: 2
						});
					}
					radgrad = this.createRadialGradient(xr-2*sr/5,yr-2*sr/5,sr/3,xr-sr/5,yr-sr/5,5*sr/5);
					radgrad.addColorStop(0, 'rgba(255,255,255,0.9)');
					radgrad.addColorStop(1, 'rgba(255,255,255,0)');
					
					// add radial gradient //
					this.beginPath();
					this.fillStyle = radgrad;
					this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
					this.fill();
				}
				else {
					radgrad = this.createRadialGradient(xr+0.4*sr, yr+0.4*sr, 0, xr+0.5*sr, yr+0.5*sr, sr);
					radgrad.addColorStop(0, 'rgba(32,32,32,1)');
					radgrad.addColorStop(1, 'rgba(0,0,0,0)');
					
					this.beginPath();
					this.fillStyle = radgrad;
					this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
					this.fill();
				
					radgrad = this.createRadialGradient(xr-0.4*sr, yr-0.4*sr, 1, xr-0.5*sr, yr-0.5*sr, 1.5*sr);
					radgrad.addColorStop(0, 'rgba(64,64,64,1)');
					radgrad.addColorStop(1, 'rgba(0,0,0,0)');
					
					this.beginPath();
					this.fillStyle = radgrad;
					this.arc(xr-board.ls, yr-board.ls, Math.max(0, sr-0.5), 0, 2*Math.PI, true);
					this.fill();
				}
			}
		},
		shadow: shadow_handler,
	},
	
	MONO: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius,
					lw = theme_variable("markupLinesWidth", board) || 1;
					
				if(args.c == WGo.W) this.fillStyle = "white";
				else this.fillStyle = "black";			
				
				this.beginPath();
				this.arc(xr, yr, Math.max(0, sr-lw), 0, 2*Math.PI, true);
				this.fill();
				
				this.lineWidth = lw;
				this.strokeStyle = "black";
				this.stroke();
			}
		},
	},
	
	CR: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
					
				this.strokeStyle = args.c || get_markup_color(board, args.x, args.y);
				this.lineWidth = args.lineWidth || theme_variable("markupLinesWidth", board) || 1;
				this.beginPath();
				this.arc(xr-board.ls, yr-board.ls, sr/2, 0, 2*Math.PI, true);
				this.stroke();
			},
		},
	},
	
	// Label drawing handler
	LB: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius,
					font = args.font || theme_variable("font", board) || "";
				
				this.fillStyle = args.c || get_markup_color(board, args.x, args.y);
				
				if(args.text.length == 1) this.font = Math.round(sr*1.5)+"px "+font;
				else if(args.text.length == 2) this.font = Math.round(sr*1.2)+"px "+font;
				else this.font = Math.round(sr)+"px "+font;
				
				this.beginPath();
				this.textBaseline="middle";
				this.textAlign="center";
				this.fillText(args.text, xr, yr, 2*sr);
				
			},
		},
		
		// modifies grid layer too
		grid: {
			draw: function(args, board) {
				if(!is_here_stone(board, args.x, args.y) && !args._nodraw) {
					var xr = board.getX(args.x),
						yr = board.getY(args.y),
						sr = board.stoneRadius;
					this.clearRect(xr-sr,yr-sr,2*sr,2*sr);
				}
			},
			clear: function(args, board) {
				if(!is_here_stone(board, args.x, args.y))  {
					args._nodraw = true;
					redraw_layer(board, "grid");
					delete args._nodraw;
				}
			}
		},
	},
	
	SQ: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = Math.round(board.stoneRadius);
					
				this.strokeStyle = args.c || get_markup_color(board, args.x, args.y);
				this.lineWidth = args.lineWidth || theme_variable("markupLinesWidth", board) || 1;
				this.beginPath();
				this.rect(Math.round(xr-sr/2)-board.ls, Math.round(yr-sr/2)-board.ls, sr, sr);
				this.stroke();
			}
		}
	},
	
	TR: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
					
				this.strokeStyle = args.c || get_markup_color(board, args.x, args.y);
				this.lineWidth = args.lineWidth || theme_variable("markupLinesWidth", board) || 1;
				this.beginPath();
				this.moveTo(xr-board.ls, yr-board.ls-Math.round(sr/2));
				this.lineTo(Math.round(xr-sr/2)-board.ls, Math.round(yr+sr/3)+board.ls);
				this.lineTo(Math.round(xr+sr/2)+board.ls, Math.round(yr+sr/3)+board.ls);
				this.closePath();
				this.stroke();
			}
		}
	},
	
	MA: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
				
				this.strokeStyle = args.c || get_markup_color(board, args.x, args.y);
				this.lineCap="round";
				this.lineWidth = (args.lineWidth || theme_variable("markupLinesWidth", board) || 1) * 2 - 1;
				this.beginPath();
				this.moveTo(Math.round(xr-sr/2), Math.round(yr-sr/2));
				this.lineTo(Math.round(xr+sr/2), Math.round(yr+sr/2));
				this.moveTo(Math.round(xr+sr/2)-1, Math.round(yr-sr/2));
				this.lineTo(Math.round(xr-sr/2)-1, Math.round(yr+sr/2));
				this.stroke();
				this.lineCap="butt";
			}
		}
	},
	
	SL: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
					
				this.fillStyle = args.c || get_markup_color(board, args.x, args.y);
				this.beginPath();
				this.rect(xr-sr/2, yr-sr/2, sr, sr);
				this.fill();
			}
		}
	},
	
	SM: {
		stone: {
			draw: function(args, board) {
				var xr = board.getX(args.x),
					yr = board.getY(args.y),
					sr = board.stoneRadius;
					
				this.strokeStyle = args.c || get_markup_color(board, args.x, args.y);
				this.lineWidth = (args.lineWidth || theme_variable("markupLinesWidth", board) || 1)*2;
				this.beginPath();
				this.arc(xr-sr/3, yr-sr/3, sr/6, 0, 2*Math.PI, true);
				this.stroke();
				this.beginPath();
				this.arc(xr+sr/3, yr-sr/3, sr/6, 0, 2*Math.PI, true);
				this.stroke();
				this.beginPath();
				this.moveTo(xr-sr/1.5,yr);
				this.bezierCurveTo(xr-sr/1.5,yr+sr/2,xr+sr/1.5,yr+sr/2,xr+sr/1.5,yr);
				this.stroke();
			}
		}
	},
	
	outline: {
		stone: {
			draw: function(args, board) {
				if(args.alpha) this.globalAlpha = args.alpha;
				else this.globalAlpha = 0.3;
				if(args.stoneStyle) Board.drawHandlers[args.stoneStyle].stone.draw.call(this, args, board);
				else board.stoneHandler.stone.draw.call(this, args, board);
				this.globalAlpha = 1;
			}
		}
	},
	
	mini: {
		stone: {
			draw: function(args, board) {
				board.stoneRadius = board.stoneRadius/2;
				if(args.stoneStyle) Board.drawHandlers[args.stoneStyle].stone.draw.call(this, args, board);
				else board.stoneHandler.stone.draw.call(this, args, board);
				board.stoneRadius = board.stoneRadius*2;
			}
		}
	},
}

Board.coordinates = {
	grid: {
		draw: function(args, board) {
			var ch, t, xright, xleft, ytop, ybottom;
			
			this.fillStyle = theme_variable("coordinatesColor", board);
			this.textBaseline="middle";
			this.textAlign="center";
			this.font = board.stoneRadius+"px "+(board.font || "");
			
			xright = board.getX(-0.75);
			xleft = board.getX(board.size-0.25);
			ytop = board.getY(-0.75);
			ybottom = board.getY(board.size-0.25);
			
			for(var i = 0; i < board.size; i++) {
				ch = i+"A".charCodeAt(0);
				if(ch >= "I".charCodeAt(0)) ch++;
				
				t = board.getY(i);
				this.fillText(board.size-i, xright, t);
				this.fillText(board.size-i, xleft, t);
				
				t = board.getX(i);
				this.fillText(String.fromCharCode(ch), t, ytop);
				this.fillText(String.fromCharCode(ch), t, ybottom);
			}
			
			this.fillStyle = "black";
		}
	}
}

Board.CanvasLayer = function() {
	this.element = document.createElement('canvas');
	this.context = this.element.getContext('2d');

	// Adjust pixel ratio for HDPI screens (e.g. Retina)
	this.pixelRatio = window.devicePixelRatio || 1;
	if (this.pixelRatio > 1) {
		this.context.scale(this.pixelRatio, this.pixelRatio);
	}
}

Board.CanvasLayer.prototype = {
	constructor: Board.CanvasLayer,
	
	setDimensions: function(width, height) {
		this.element.width = width;
		this.element.style.width = (width / this.pixelRatio) + 'px';
		this.element.height = height;
		this.element.style.height = (height / this.pixelRatio) + 'px';
	},
	
	appendTo: function(element, weight) {
		this.element.style.position = 'absolute';
		this.element.style.zIndex = weight;
		element.appendChild(this.element);
	},
	
	removeFrom: function(element) {
		element.removeChild(this.element);
	},
	
	getContext: function() {
		return this.context;
	},
	
	draw: function(board) {	},
	
	clear: function() {
		this.context.clearRect(0,0,this.element.width,this.element.height);
	}
}

Board.GridLayer = WGo.extendClass(Board.CanvasLayer, function() {
	this.super.call(this);
});

Board.GridLayer.prototype.draw = function(board) {
	// draw grid
	var tmp;

	this.context.beginPath();
	this.context.lineWidth = theme_variable("gridLinesWidth", board);
	this.context.strokeStyle = theme_variable("gridLinesColor", board);
	
	var tx = Math.round(board.left),
		ty = Math.round(board.top),
		bw = Math.round(board.fieldWidth*(board.size-1)),
		bh = Math.round(board.fieldHeight*(board.size-1));
	
	this.context.strokeRect(tx-board.ls, ty-board.ls, bw, bh);

	for(var i = 1; i < board.size-1; i++) {
		tmp = Math.round(board.getX(i))-board.ls;
		this.context.moveTo(tmp, ty);
		this.context.lineTo(tmp, ty+bh);
		
		tmp = Math.round(board.getY(i))-board.ls;
		this.context.moveTo(tx, tmp);
		this.context.lineTo(tx+bw, tmp);
	}

	this.context.stroke();
	
	// draw stars
	this.context.fillStyle = theme_variable("starColor", board);
	
	if(board.starPoints[board.size]) {
		for(var key in board.starPoints[board.size]) {
			this.context.beginPath();
			this.context.arc(board.getX(board.starPoints[board.size][key].x)-board.ls, board.getY(board.starPoints[board.size][key].y)-board.ls, theme_variable("starSize", board), 0, 2*Math.PI,true);
			this.context.fill();
		}
	}
}

/**
 * Layer that is composed from more canvases. The proper canvas is selected according to drawn object.
 * In default there are 4 canvases and they are used for board objects like stones. This allows overlapping of objects.
 */
Board.MultipleCanvasLayer = WGo.extendClass(Board.CanvasLayer, function() {
	this.init(4);
});

Board.MultipleCanvasLayer.prototype.init = function(n) {
	var tmp, tmpContext;
	
	this.layers = n;
	
	this.elements = [];
	this.contexts = [];

	// Adjust pixel ratio for HDPI screens (e.g. Retina)
	this.pixelRatio = window.devicePixelRatio || 1;
	
	for(var i = 0; i < n; i++) {
		tmp = document.createElement('canvas');
		tmpContext = tmp.getContext('2d');

		if (this.pixelRatio > 1) {
			tmpContext.scale(this.pixelRatio, this.pixelRatio);
		}

		this.elements.push(tmp);
		this.contexts.push(tmpContext);
	}
}

Board.MultipleCanvasLayer.prototype.appendTo = function(element, weight) {
	for(var i = 0; i < this.layers; i++) {
		this.elements[i].style.position = 'absolute';
		this.elements[i].style.zIndex = weight;
		element.appendChild(this.elements[i]);
	}
}

Board.MultipleCanvasLayer.prototype.removeFrom = function(element) {
	for(var i = 0; i < this.layers; i++) {
		element.removeChild(this.elements[i]);
	}
}

Board.MultipleCanvasLayer.prototype.getContext = function(args) {
	if(args.x%2) {
		return (args.y%2) ? this.contexts[0] : this.contexts[1];
	}
	else {
		return (args.y%2) ? this.contexts[2] : this.contexts[3];
	}
	//return ((args.x%2) && (args.y%2) || !(args.x%2) && !(args.y%2)) ? this.context_odd : this.context_even;
}

Board.MultipleCanvasLayer.prototype.clear = function(element, weight) {
	for(var i = 0; i < this.layers; i++) {
		this.contexts[i].clearRect(0,0,this.elements[i].width,this.elements[i].height);
	}
}

Board.MultipleCanvasLayer.prototype.setDimensions = function(width, height) {
	for(var i = 0; i < this.layers; i++) {
		this.elements[i].width = width;
		this.elements[i].style.width = (width / this.pixelRatio) + 'px';
		this.elements[i].height = height;
		this.elements[i].style.height = (height / this.pixelRatio) + 'px';
	}
}

Board.ShadowLayer = WGo.extendClass(Board.MultipleCanvasLayer, function(board, shadowSize, shadowBlur) {
	this.init(2);
	this.shadowSize = shadowSize === undefined ? 1 : shadowSize;
	this.board = board;
});

Board.ShadowLayer.prototype.getContext = function(args) {
	return ((args.x%2) && (args.y%2) || !(args.x%2) && !(args.y%2)) ? this.contexts[0] : this.contexts[1];
}

Board.ShadowLayer.prototype.setDimensions = function(width, height) {
	this.super.prototype.setDimensions.call(this, width, height);
	
	for(var i = 0; i < this.layers; i++) {
		this.contexts[i].setTransform(1,0,0,1,Math.round(this.shadowSize*this.board.stoneRadius/7),Math.round(this.shadowSize*this.board.stoneRadius/7));
	}	
}

var default_field_clear = function(args, board) {
	var xr = board.getX(args.x),
		yr = board.getY(args.y),
		sr = board.stoneRadius;
	this.clearRect(xr-2*sr-board.ls,yr-2*sr-board.ls, 4*sr, 4*sr);
}

// Private methods of WGo.Board

var calcLeftMargin = function() {
	return (3*this.width)/(4*(this.bx+1-this.tx)+2) - this.fieldWidth*this.tx;
}

var calcTopMargin = function() {
	return (3*this.height)/(4*(this.by+1-this.ty)+2) - this.fieldHeight*this.ty;
}

var calcFieldWidth = function() {
	return (4*this.width)/(4*(this.bx+1-this.tx)+2);
}

var calcFieldHeight = function() {
	return (4*this.height)/(4*(this.by+1-this.ty)+2);
}

var clearField = function(x,y) {
	var handler;
	for(var key in this.obj_arr[x][y]) {
		if(!this.obj_arr[x][y][key].type) handler = this.stoneHandler;
		else if(typeof this.obj_arr[x][y][key].type == "string") handler = Board.drawHandlers[this.obj_arr[x][y][key].type];
		else handler = this.obj_arr[x][y][key].type;
		
		for(var layer in handler) {
			if(handler[layer].clear) handler[layer].clear.call(this[layer].getContext(this.obj_arr[x][y][key]), this.obj_arr[x][y][key], this);
			else default_field_clear.call(this[layer].getContext(this.obj_arr[x][y][key]), this.obj_arr[x][y][key], this);
		}
	}
}

var drawField = function(x,y) {
	var handler;
	for(var key in this.obj_arr[x][y]) {
		if(!this.obj_arr[x][y][key].type) handler = this.stoneHandler;
		else if(typeof this.obj_arr[x][y][key].type == "string") handler = Board.drawHandlers[this.obj_arr[x][y][key].type];
		else handler = this.obj_arr[x][y][key].type;
		
		for(var layer in handler) {
			handler[layer].draw.call(this[layer].getContext(this.obj_arr[x][y][key]), this.obj_arr[x][y][key], this);
		}
	}
}

var getMousePos = function(e) {
    var target = e.target,
        board = target.getBoundingClientRect(),
        boardX = target.offsetLeft,
        boardY = target.offsetTop,
        horizontalFieldSize = this.fieldWidth / this.pixelRatio,
        verticalFieldSize = this.fieldHeight / this.pixelRatio,
        horizontalMargin = board.width - (this.size * horizontalFieldSize),
        verticalMargin = board.height - (this.size * verticalFieldSize),
        horizontalSize = board.width - horizontalMargin,
        verticalSize = board.height - verticalMargin,
        x, y;

    while (target = target.offsetParent) {
        boardX += target.offsetLeft;
        boardY += target.offsetTop;
    }

    // dirty hack for chrome 38 which returns different values than expected
    // I was unable to google the problem (maybe it's not the problem but
    // I wasn't able to google the reason why it works this way either)
    if (WGo.androidChrome38) {
        boardX += document.body.scrollLeft;
        boardY += document.body.scrollTop;
    }

    boardX += verticalMargin / 2;
    boardY += horizontalMargin / 2;

    x = (e.pageX - boardX) / horizontalSize;
    y = (e.pageY - boardY) / verticalSize;

    x = Math.floor(x * this.size);
    y = Math.floor(y * this.size);

	return {
		x: x >= this.size ? -1 : x,
		y: y >= this.size ? -1 : y
	};
};

var updateDim = function() {
	this.element.style.width = (this.width / this.pixelRatio) + "px";
	this.element.style.height = (this.height / this.pixelRatio) + "px";
	
	this.stoneRadius = theme_variable("stoneSize", this);
	//if(this.autoLineWidth) this.lineWidth = this.stoneRadius/7; //< 15 ? 1 : 3;
	this.ls = theme_variable("linesShift", this);
	
	for(var key in this.layers) {
		this.layers[key].setDimensions(this.width, this.height); 
	}
}

// Public methods are in the prototype:

Board.prototype = {
	constructor: Board,
	
	/**
     * Initialization method, it is called in constructor. You shouldn't call it, but you can alter it.
	 */
	 
	init: function() {
		
		// placement of objects (in 3D array)
		this.obj_arr = []; 
		for(var i = 0; i < this.size; i++) {
			this.obj_arr[i] = [];
			for(var j = 0; j < this.size; j++) this.obj_arr[i][j] = [];
		}
		
		// other objects, stored in list
		this.obj_list = []; 
		
		// layers
		this.layers = [];
		
		// event listeners, binded to board
		this.listeners = [];
		
		this.element = document.createElement('div');
		this.element.className = 'wgo-board';
		
		if(this.background) {
			if(this.background[0] == "#") this.element.style.backgroundColor = this.background;
			else {
				this.element.style.backgroundImage = "url('"+this.background+"')";
				/*this.element.style.backgroundRepeat = "repeat";*/
			}
		}
		
		this.grid = new Board.GridLayer();
		this.shadow = new Board.ShadowLayer(this, theme_variable("shadowSize", this));
		this.stone = new Board.MultipleCanvasLayer();
		
		this.addLayer(this.grid, 100);
		this.addLayer(this.shadow, 200);
		this.addLayer(this.stone, 300);
	},
	
	/**
	 * Set new width of board, height is computed to keep aspect ratio.
	 * 
	 * @param {number} width
	 */
	
	setWidth: function(width) {
		this.width = width;
		this.width *= this.pixelRatio;
		this.fieldHeight = this.fieldWidth = calcFieldWidth.call(this);
		this.left = calcLeftMargin.call(this);
		
		this.height = (this.by-this.ty+1.5)*this.fieldHeight;
		this.top = calcTopMargin.call(this);
		
		updateDim.call(this);
		this.redraw();
	},
	
	/**
	 * Set new height of board, width is computed to keep aspect ratio.
	 * 
	 * @param {number} height
	 */
	
	setHeight: function(height) {
		this.height = height;
		this.height *= this.pixelRatio;
		this.fieldWidth = this.fieldHeight = calcFieldHeight.call(this);
		this.top = calcTopMargin.call(this);
		
		this.width = (this.bx-this.tx+1.5)*this.fieldWidth;
		this.left = calcLeftMargin.call(this);
		
		updateDim.call(this);
		this.redraw();
	},
	
	/**
	 * Set both dimensions.
	 * 
	 * @param {number} width
	 * @param {number} height
	 */
	
	setDimensions: function(width, height) {
		this.width = width || parseInt(this.element.style.width, 10);
		this.width *= this.pixelRatio;
		this.height = height || parseInt(this.element.style.height, 10);
		this.height *= this.pixelRatio;
		
		this.fieldWidth = calcFieldWidth.call(this);
		this.fieldHeight = calcFieldHeight.call(this);
		this.left = calcLeftMargin.call(this);			
		this.top = calcTopMargin.call(this);
		
		updateDim.call(this);
		this.redraw();
	},
	
	/**
	 * Get currently visible section of the board
	 */
	
	getSection: function() {
		return this.section;
	},
	
	/**
	 * Set section of the board to be displayed
	 */
	
	setSection: function(section_or_top, right, bottom, left) {
		if(typeof section_or_top == "object") {
			this.section = section_or_top;
		}
		else {
			this.section = {
				top: section_or_top,
				right: right,
				bottom: bottom,
				left: left,
			}
		}
		
		this.tx = this.section.left;
		this.ty = this.section.top;
		this.bx = this.size-1-this.section.right;
		this.by = this.size-1-this.section.bottom;
		
		this.setDimensions();
	},
	
	/**
	 * Set board size (eg: 9, 13 or 19), this will clear board's objects.
	 */
	 
	setSize: function(size) {
		var size = size || 19;
		
		if(size != this.size) {
			this.size = size;
			
			this.obj_arr = [];
			for(var i = 0; i < this.size; i++) {
				this.obj_arr[i] = [];
				for(var j = 0; j < this.size; j++) this.obj_arr[i][j] = [];
			}
		
			this.bx = this.size-1-this.section.right;
			this.by = this.size-1-this.section.bottom;
			this.setDimensions();
		}
	},
	
	/**
	 * Redraw everything.
	 */
	
	redraw: function() {
		// redraw layers
		for(var i = 0; i < this.layers.length; i++) {
			this.layers[i].clear(this);
			this.layers[i].draw(this);
		}
		
		// redraw field objects
		for(var i = 0; i < this.size; i++) {
			for(var j = 0; j < this.size; j++) {
				drawField.call(this, i, j);
			}
		}
		
		// redraw custom objects
		for(var key in this.obj_list) {
			var handler = this.obj_list[key].handler;
			
			for(var layer in handler) {
				handler[layer].draw.call(this[layer].getContext(this.obj_list[key].args), this.obj_list[key].args, this);
			}
		}
	},
	
	/**
	 * Get absolute X coordinate
	 *
	 * @param {number} x relative coordinate
	 */
	
	getX: function(x) {
		return this.left+x*this.fieldWidth;
	},
	
	/**
	 * Get absolute Y coordinate
	 *
	 * @param {number} y relative coordinate
	 */
	
	getY: function(y) {
		return this.top+y*this.fieldHeight;
	},
	
	/**
	 * Add layer to the board. It is meant to be only for canvas layers.
	 *
	 * @param {Board.CanvasLayer} layer to add
	 * @param {number} weight layer with biggest weight is on the top 
	 */
	
	addLayer: function(layer, weight) {
		layer.appendTo(this.element, weight);
		layer.setDimensions(this.width, this.height);
		this.layers.push(layer);
	},
	
	/**
	 * Remove layer from the board.
	 *
	 * @param {Board.CanvasLayer} layer to remove
	 */
	
	removeLayer: function(layer) {
		var i = this.layers.indexOf(layer);
		if(i >= 0) {
			this.layers.splice(i,1);
			layer.removeFrom(this.element);
		}
	},
	
	update: function(changes) {
		if(changes.remove && changes.remove == "all") this.removeAllObjects();
		else if(changes.remove) {
			for(var key in changes.remove) this.removeObject(changes.remove[key]);
		}
		
		if(changes.add) {
			for(var key in changes.add) this.addObject(changes.add[key]);
		}
	},
	
	addObject: function(obj) {
		// handling multiple objects
		if(obj.constructor == Array) {
			for(var key in obj) this.addObject(obj[key]);
			return;
		}
		
		// clear all objects on object's coordinates
		clearField.call(this, obj.x, obj.y);
		
		// if object of this type is on the board, replace it
		for(var key in this.obj_arr[obj.x][obj.y]) {
			if(this.obj_arr[obj.x][obj.y][key].type == obj.type) {
				this.obj_arr[obj.x][obj.y][key] = obj;
				drawField.call(this, obj.x, obj.y);
				return;
			}
		}	
		
		// if object is a stone, add it at the beginning, otherwise at the end
		if(!obj.type) this.obj_arr[obj.x][obj.y].unshift(obj);
		else this.obj_arr[obj.x][obj.y].push(obj);
		
		// draw all objects
		drawField.call(this, obj.x, obj.y);
	},
	
	removeObject: function(obj) {
		// handling multiple objects
		if(obj.constructor == Array) {
			for(var key in obj) this.removeObject(obj[key]);
			return;
		}
		
		var i;
		for(var j = 0; j < this.obj_arr[obj.x][obj.y].length; j++) {
			if(this.obj_arr[obj.x][obj.y][j].type == obj.type) {
				i = j;
				break;
			}
		}
		if(i === undefined) return;
		
		// clear all objects on object's coordinates
		clearField.call(this, obj.x, obj.y);
		
		this.obj_arr[obj.x][obj.y].splice(i,1);
		
		drawField.call(this, obj.x, obj.y);
	},

	removeObjectsAt: function(x, y) {
		if(!this.obj_arr[x][y].length) return;
		
		clearField.call(this, x, y);
		this.obj_arr[x][y] = [];
	},

	removeAllObjects: function() {
		this.obj_arr = []; 
		for(var i = 0; i < this.size; i++) {
			this.obj_arr[i] = [];
			for(var j = 0; j < this.size; j++) this.obj_arr[i][j] = [];
		}
		this.redraw();
	},
	
	addCustomObject: function(handler, args) {
		this.obj_list.push({handler: handler, args: args});
		this.redraw();
	},
	
	removeCustomObject: function(handler, args) {
		for(var key in this.obj_list) {
			if(this.obj_list[key].handler == handler && this.obj_list[key].args == args) {
				delete this.obj_list[key];
				this.redraw();
				return true;
			}
		}
		return false;
	},
	
	addEventListener: function(type, callback) {
		var _this = this,
			evListener = {
				type: type,
				callback: callback,
				handleEvent: function(e) {
					var coo = getMousePos.call(_this, e);
					callback(coo.x, coo.y, e);
				}
			};
			
		this.element.addEventListener(type, evListener, true);
		this.listeners.push(evListener);
	},
	
	removeEventListener: function(type, callback) {
		for(var key in this.listeners) {
			if(this.listeners[key].type == type && this.listeners[key].callback == callback) {
				this.element.removeEventListener(this.listeners[key].type, this.listeners[key], true);
				delete this.listeners[key];
				return true;
			}
		}
		return false;
	},
	
	getState: function() {
		return {
			objects: WGo.clone(this.obj_arr),
			custom: WGo.clone(this.obj_list)
		};
	},
	
	restoreState: function(state) {
		this.obj_arr = state.objects || this.obj_arr;
		this.obj_list = state.custom || this.obj_list;
		
		this.redraw();
	}
}

Board.default = {
	size: 19,
	width: 0,
	height: 0,
	font: "Calibri", // deprecated
	lineWidth: 1, // deprecated
	autoLineWidth: false, // deprecated
	starPoints: {
		19:[{x:3, y:3 },
			{x:9, y:3 },
			{x:15,y:3 },
			{x:3, y:9 },
			{x:9, y:9 },
			{x:15,y:9 },
			{x:3, y:15},
			{x:9, y:15},
			{x:15,y:15}],
		13:[{x:3, y:3},
			{x:9, y:3},
			{x:3, y:9},
			{x:9, y:9}],
		9:[{x:4, y:4}],
	},
	stoneHandler: Board.drawHandlers.SHELL,
	starSize: 1, // deprecated
	shadowSize: 1, // deprecated
	stoneSize: 1, // deprecated
	section: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	background: 'wood.jpg', //WGo.DIR+"wood1.jpg",
	theme: {}
}

// save Board
WGo.Board = Board;

//-------- WGo.Game ---------------------------------------------------------------------------

/**
 * Creates instance of position object.
 *
 * @class 
 * <p>WGo.Position is simple object storing position of go game. It is implemented as matrix <em>size</em> x <em>size</em> with values WGo.BLACK, WGo.WHITE or 0. It can be used by any extension.</p>
 *
 * @param {number} size of the board
 */

var Position = function(size) {
	this.size = size || 19;
	this.schema = [];
	for(var i = 0; i < this.size*this.size; i++) {
		this.schema[i] = 0;
	}
}

Position.prototype = {
	constructor: WGo.Position,
	
	/**
	 * Returns value of given coordinates.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {(WGo.BLACK|WGo.WHITE|0)} color
	 */

	get: function(x,y) {
		if(x < 0 || y < 0 || x >= this.size || y >= this.size) return undefined;
		return this.schema[x*this.size+y];
	},

	/**
	 * Sets value of given coordinates.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W|0)} c color
	 */

	set: function(x,y,c) {
		this.schema[x*this.size+y] = c;
		return this;
	},

	/**
	 * Clears the whole position (every value is set to 0).
	 */

	clear: function() {
		for(var i = 0; i < this.size*this.size; i++) this.schema[i] = 0;
		return this;
	},

	/**
	 * Clones the whole position.
	 * 
	 * @return {WGo.Position} copy of position
	 */

	clone: function() {
		var clone = new Position(this.size);
		clone.schema = this.schema.slice(0);
		return clone;
	},
	
	/**
	 * Compares this position with another position and return change object
	 *
	 * @param {WGo.Position} position to compare to.
	 * @return {object} change object with structure: {add:[], remove:[]}
	 */
	
	compare: function(position) {
		var add = [], remove = [];
		
		for(var i = 0; i < this.size*this.size; i++) {
			if(this.schema[i] && !position.schema[i]) remove.push({
				x: Math.floor(i/this.size),
				y: i%this.size
			});
			else if(this.schema[i] != position.schema[i]) add.push({
				x: Math.floor(i/this.size),
				y: i%this.size,
				c: position.schema[i]
			});
		}
		
		return {
			add: add,
			remove: remove
		}
	}
}

WGo.Position = Position;

/**
 * Creates instance of game class.
 *
 * @class 
 * This class implements game logic. It basically analyses given moves and returns capture stones. 
 * WGo.Game also stores every position from beginning, so it has ability to check repeating positions
 * and it can effectively restore old positions.</p>
 *
 * @param {number} size of the board
 * @param {"KO"|"ALL"|"NONE"} checkRepeat (optional, default is "KO") - how to handle repeated position:
 * KO - ko is properly handled - position cannot be same like previous position
 * ALL - position cannot be same like any previous position - e.g. it forbids triple ko
 * NONE - position can be repeated
 *
 * @param {boolean} allowRewrite (optional, default is false) - allow to play moves, which were already played:
 * @param {boolean} allowSuicide (optional, default is false) - allow to play suicides, stones are immediately captured
 */

var Game = function(size, checkRepeat, allowRewrite, allowSuicide) {
	this.size = size || 19;
	this.repeating = checkRepeat === undefined ? "KO" : checkRepeat; // possible values: KO, ALL or nothing
	this.allow_rewrite = allowRewrite || false;
	this.allow_suicide = allowSuicide || false;
	
	this.stack = [];
	this.stack[0] = new Position(this.size);
	this.stack[0].capCount = {black:0, white:0};
	this.turn = WGo.B;
	
	Object.defineProperty(this, "position", {
		get : function(){ return this.stack[this.stack.length-1]; },
		set : function(pos){ this[this.stack.length-1] = pos; }
	});					  
}

// function for stone capturing
var do_capture = function(position, captured, x, y, c) {
	if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
		position.set(x,y,0);
		captured.push({x:x, y:y});

		do_capture(position, captured, x, y-1, c);
		do_capture(position, captured, x, y+1, c);
		do_capture(position, captured, x-1, y, c);
		do_capture(position, captured, x+1, y, c);
	}
}

// looking at liberties
var check_liberties = function(position, testing, x, y, c) {
	// out of the board there aren't liberties
	if(x < 0 || x >= position.size || y < 0 || y >= position.size) return true;
	// however empty field means liberty
	if(position.get(x,y) == 0) return false;
	// already tested field or stone of enemy isn't giving us a liberty.
	if(testing.get(x,y) == true || position.get(x,y) == -c) return true;
	
	// set this field as tested
	testing.set(x,y,true);
	
	// in this case we are checking our stone, if we get 4 trues, it has no liberty
	return 	check_liberties(position, testing, x, y-1, c) && 
			check_liberties(position, testing, x, y+1, c) &&
			check_liberties(position, testing, x-1, y, c) &&
			check_liberties(position, testing, x+1, y, c);
}

// analysing function - modifies original position, if there are some capturing, and returns array of captured stones
var check_capturing = function(position, x, y, c) {
	var captured = [];
	// is there a stone possible to capture?
	if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
		// create testing map
		var testing = new Position(position.size);
		// if it has zero liberties capture it
		if(check_liberties(position, testing, x, y, c)) {
			// capture stones from game
			do_capture(position, captured, x, y, c);
		}
	}
	return captured;
}

// analysing history
var checkHistory = function(position, x, y) {
	var flag, stop; 
	
	if(this.repeating == "KO" && this.stack.length-2 >= 0) stop = this.stack.length-2;
	else if(this.repeating == "ALL") stop = 0;
	else return true;
	
	for(var i = this.stack.length-2; i >= stop; i--) {
		if(this.stack[i].get(x,y) == position.get(x,y)) {
			flag = true;
			for(var j = 0; j < this.size*this.size; j++) {
				if(this.stack[i].schema[j] != position.schema[j]) {
					flag = false; 
					break;
				}
			}
			if(flag) return false;
		}
	}
	
	return true;
}

Game.prototype = {
	
	constructor: Game,
	
	/**
	 * Gets actual position.
	 *
	 * @return {WGo.Position} actual position
	 */
	
	getPosition: function() {
		return this.stack[this.stack.length-1];
	},
	
	/**
	 * Play move. 
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W)} c color
	 * @param {boolean} noplay - if true, move isn't played. Used by WGo.Game.isValid.
	 * @return {number} code of error, if move isn't valid. If it is valid, function returns array of captured stones.
	 * 
	 * Error codes: 
	 * 1 - given coordinates are not on board
	 * 2 - on given coordinates already is a stone
	 * 3 - suicide (currently they are forbbiden)
	 * 4 - repeated position
	 */
	
	play: function(x,y,c,noplay) {
		//check coordinates validity
		if(!this.isOnBoard(x,y)) return 1;
		if(!this.allow_rewrite && this.position.get(x,y) != 0) return 2;
		
		// clone position
		if(!c) c = this.turn; 
		
		var new_pos = this.position.clone();	
		new_pos.set(x,y,c);
		
		// check capturing
		var cap_color = c;
		var captured = check_capturing(new_pos, x-1, y, -c).concat(check_capturing(new_pos, x+1, y, -c), check_capturing(new_pos, x, y-1, -c), check_capturing(new_pos, x, y+1, -c));
		
		// check suicide
		if(!captured.length) {
			var testing = new Position(this.size);
			if(check_liberties(new_pos, testing, x, y, c)) {
				if(this.allow_suicide) {
					cap_color = -c;
					do_capture(new_pos, captured, x, y, c);
				}
				else return 3;
			}
		}
		
		// check history
		if(this.repeating && !checkHistory.call(this, new_pos, x, y)) {
			return 4;
		}
		
		if(noplay) return false;
		
		// update position info
		new_pos.color = c;
		new_pos.capCount = {
			black: this.position.capCount.black, 
			white: this.position.capCount.white
		};
		if(cap_color == WGo.B) new_pos.capCount.black += captured.length;
		else new_pos.capCount.white += captured.length;
		
		// save position
		this.pushPosition(new_pos);
		
		// reverse turn
		this.turn = -c;
		
		return captured;
		
	},
	
	/**
	 * Play pass.
	 *
	 * @param {(WGo.B|WGo.W)} c color
	 */
	
	pass: function(c) {
		this.pushPosition();
		if(c) {
			this.position.color = c;
			this.turn = -c; 
		}
		else {
			this.position.color = this.turn;
			this.turn = -this.turn;
		}
	},
	
	/**
	 * Finds out validity of the move. 
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W)} c color
	 * @return {boolean} true if move can be played.
	 */
	
	isValid: function(x,y,c) {
		return typeof this.play(x,y,c,true) != "number";
	},
	
	/**
	 * Controls position of the move. 
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {boolean} true if move is on board.
	 */
	
	isOnBoard: function(x,y) {
		return x >= 0 && y >= 0 && x < this.size && y < this.size;
	},
	
	/**
	 * Inserts move into current position. Use for setting position, for example in handicap game. Field must be empty.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W)} c color
	 * @return {boolean} true if operation is successfull.
	 */
	
	addStone: function(x,y,c) {
		if(this.isOnBoard(x,y) && this.position.get(x,y) == 0) {
			this.position.set(x,y,c || 0);
			return true;
		}
		return false;
	},
	
	/**
	 * Removes move from current position. 
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {boolean} true if operation is successfull.
	 */
	
	removeStone: function(x,y) {
		if(this.isOnBoard(x,y) && this.position.get(x,y) != 0) {
			this.position.set(x,y,0);
			return true;
		}
		return false;
	},
	
	/**
	 * Set or insert move of current position.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W)} c color
	 * @return {boolean} true if operation is successfull.
	 */
	
	setStone: function(x,y,c) {
		if(this.isOnBoard(x,y)) {
			this.position.set(x,y,c || 0);
			return true;
		}
		return false;
	},
	
	/**
	 * Get stone on given position.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {(WGo.B|WGo.W|0)} color
	 */
	
	getStone: function(x,y) {
		if(this.isOnBoard(x,y)) {
			return this.position.get(x,y);
		}
		return 0;
	},
	
	/**
	 * Add position to stack. If position isn't specified current position is cloned and stacked.
	 * Pointer of actual position is moved to the new position.
	 *
	 * @param {WGo.Position} tmp position (optional)
	 */
	
	pushPosition: function(pos) {
		if(!pos) {
			var pos = this.position.clone();
			pos.capCount = {
				black: this.position.capCount.black,
				white: this.position.capCount.white
			};
			pos.color = this.position.color;
		}
		this.stack.push(pos);
		if(pos.color) this.turn = -pos.color;
		return this;
	},
	
	/**
	 * Remove current position from stack. Pointer of actual position is moved to the previous position.
	 */
	
	popPosition: function() {
		var old = null;
		if(this.stack.length > 0) {
			old = this.stack.pop();
			
			if(this.stack.length == 0) this.turn = WGo.B;
			else if(this.position.color) this.turn = -this.position.color;
			else this.turn = -this.turn;
		}
		return old;
	},
	
	/**
	 * Removes all positions.
	 */
	
	firstPosition: function() {
		this.stack = [];
		this.stack[0] = new Position(this.size);
		this.stack[0].capCount = {black:0, white:0};
		this.turn = WGo.B;
		return this;
	},
	
	/**
	 * Gets count of captured stones.
	 *
	 * @param {(WGo.BLACK|WGo.WHITE)} color
	 * @return {number} count
	 */
	
	getCaptureCount: function(color) {
		return color == WGo.B ? this.position.capCount.black : this.position.capCount.white;
	},
	
	/**
	 * Validate postion. Position is tested from 0:0 to size:size, if there are some moves, that should be captured, they will be removed.
	 * You can use this, after insertion of more stones.
	 *
	 * @return array removed stones
	 */
	 
	validatePosition: function() {
		var c, p,
		    white = 0, 
			black = 0,
		    captured = [],
		    new_pos = this.position.clone();
		
		for(var x = 0; x < this.size; x++) {
			for(var y = 0; y < this.size; y++) {
				c = this.position.get(x,y);
				if(c) {
					p = captured.length;
					captured = captured.concat(check_capturing(new_pos, x-1, y, -c),
											   check_capturing(new_pos, x+1, y, -c),
											   check_capturing(new_pos, x, y-1, -c),
											   check_capturing(new_pos, x, y+1, -c));
								
					if(c == WGo.B) black += captured-p;
					else white += captured-p;
				}
			}
		}
		this.position.capCount.black += black;
		this.position.capCount.white += white;
		this.position.schema = new_pos.schema;
		
		return captured;
	},
};

// save Game
WGo.Game = Game;

// register WGo
window.WGo = WGo; 

})(window);
 
/** 
 * This extension handles go game records(kifu). In WGo kifu is stored in JSON. Kifu structure example:
 *
 * JGO proposal = {
 *	 size: 19,
 *	 info: {
 *	 	black: {name:"Lee Chang-Ho", rank:"9p"},
 *	 	white: {name:"Lee Sedol", rank:"9p"},
 *	 	komi: 6.5,
 *   },
 *	 game: [
 *	   {B:"mm"},
 * 	   {W:"nn"},
 *	   {B:"cd"},
 *     {},
 *   ]
 * }
 *
 */
 
(function (WGo, undefined) {

"use strict";

var recursive_clone = function(node) {
	var n = new KNode(JSON.parse(JSON.stringify(node.getProperties())));
	for(var ch in node.children) {
		n.appendChild(recursive_clone(node.children[ch]));
	}
	return n;
}

var find_property = function(prop, node) {
	var res;
	if(node[prop] !== undefined) return node[prop];
	for(var ch in node.children) {
		res = find_property(prop, node.children[ch])
		if(res) return res;
	}
	return false;
}

var recursive_save = function(gameTree, node) {
	gameTree.push(JSON.parse(JSON.stringify(node.getProperties())));
	if(node.children.length > 1) {
		var nt = [];
		for(var i = 0; i < node.children.length; i++) {
			var t = [];
			recursive_save(t, node.children[i]);
			nt.push(t);
		}
		gameTree.push(nt);
	}
	else if(node.children.length) {
		recursive_save(gameTree, node.children[0]);
	}
}

var recursive_save2 = function(gameTree, node) {
	var anode = node;
	var tnode;
	
	for(var i = 1; i < gameTree.length; i++) {
		if(gameTree[i].constructor == Array) {
			for(var j = 0; j < gameTree[i].length; j++) {
				tnode = new KNode(gameTree[i][j][0]);
				anode.appendChild(tnode);
				recursive_save2(gameTree[i][j], tnode);
			}
		}
		else {
			tnode = new KNode(gameTree[i]);
			anode.insertAfter(tnode);
			anode = tnode;
		}
	}
}

/**
 * Kifu class - for storing go game record and easy manipulation with it
 */

var Kifu = function() {
	this.size = 19;
	this.info = {};
	this.root = new KNode();
	this.nodeCount = 0;
	this.propertyCount = 0;
}

Kifu.prototype ={
	constructor: Kifu,
	clone: function() {
		var clone = new Kifu();
		clone.size = this.size;
		clone.info = JSON.parse(JSON.stringify(this.info));
		clone.root = recursive_clone(this.root);
		clone.nodeCount = this.nodeCount;
		clone.propertyCount = this.propertyCount;
		return clone;
	},
	hasComments: function() {
		return !!find_property("comment", this.root);
	},
}

/**
 * Create kifu object from SGF string
 */

Kifu.fromSgf = function(sgf) {
	return WGo.SGF.parse(sgf);
}

/**
 * Create kifu object from JGO
 */

Kifu.fromJGO = function(arg) {
	var jgo = typeof arg == "string" ? JSON.parse(arg) : arg;
	var kifu = new Kifu();
	kifu.info = JSON.parse(JSON.stringify(jgo.info));
	kifu.size = jgo.size;
	kifu.nodeCount = jgo.nodeCount;
	kifu.propertyCount = jgo.propertyCount;
		
	kifu.root = new KNode(jgo.game[0]);
	recursive_save2(jgo.game, kifu.root);
	
	return kifu;
}

/**
 * Return SGF string from kifu object
 */

Kifu.prototype.toSgf = function() {
	// not implemented yet
}

/**
 * Return JGO from kifu object
 */

Kifu.prototype.toJGO = function(stringify) {
	var jgo = {};
	jgo.size = this.size;
	jgo.info = JSON.parse(JSON.stringify(this.info));
	jgo.nodeCount = this.nodeCount;
	jgo.propertyCount = this.propertyCount;
	jgo.game = [];
	recursive_save(jgo.game, this.root);
	if(stringify) return JSON.stringify(jgo);
	else return jgo;
}

var player_formatter = function(value) {
	var str;
	if(value.name) {
		str = WGo.filterHTML(value.name);
		if(value.rank) str += " ("+WGo.filterHTML(value.rank)+")";
		if(value.team) str += ", "+WGo.filterHTML(value.team);
	}
	else {
		if(value.team) str = WGo.filterHTML(value.team);
		if(value.rank) str += " ("+WGo.filterHTML(value.rank)+")";
	}
	return str;
}

/**
 * Game information formatters. Each formatter is a function which somehow formats input text.
 */

Kifu.infoFormatters = {
	black: player_formatter,
	white: player_formatter,
	TM: function(time) {
		if(time == 0) return WGo.t("none");
		
		var res, t = Math.floor(time/60);
		
		if(t == 1) res = "1 "+WGo.t("minute");
		else if(t > 1) res = t+" "+WGo.t("minutes");
		
		t = time%60;
		if(t == 1) res += " 1 "+WGo.t("second");
		else if(t > 1) res += " "+t+" "+WGo.t("seconds");
		
		return res;
	},
	RE: function(res) {
		return '<a href="javascript: void(0)" onclick="this.parentNode.innerHTML = \''+WGo.filterHTML(res)+'\'" title="'+WGo.t('res-show-tip')+'">'+WGo.t('show')+'</a>';
	},
}

/**
 * List of game information properties
 */

Kifu.infoList = ["black", "white", "AN", "CP", "DT", "EV", "GN", "GC", "HA", "ON", "OT", "RE", "RO", "RU", "SO", "TM", "US","PC", "KM"];

WGo.Kifu = Kifu;

var no_add = function(arr, obj, key) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].x == obj.x && arr[i].y == obj.y) {
			arr[i][key] = obj[key];
			return;
		}
	}
	arr.push(obj);
}

var no_remove = function(arr, obj) {
	if(!arr) return;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].x == obj.x && arr[i].y == obj.y) {
			arr.splice(i,1);
			return;
		}
	}
}

/**
 * Node class of kifu game tree. It can contain move, setup or markup properties.
 *
 * @param {object} properties
 * @param {KNode} parent (null for root node)
 */

var KNode = function(properties, parent) {
	this.parent = parent || null;
	this.children = [];
	// save all properties
	if(properties) for(var key in properties) this[key] = properties[key];
}

KNode.prototype = {
	constructor: KNode,
	
	/**
	 * Get node's children specified by index. If it doesn't exist, method returns null.
	 */
	
	getChild: function(ch) {
		var i = ch || 0;
		if(this.children[i]) return this.children[i];
		else return null;
	},
	
	/**
	 * Add setup property.
	 * 
	 * @param {object} setup object with structure: {x:<x coordinate>, y:<y coordinate>, c:<color>}
	 */
	
	addSetup: function(setup) {
		this.setup = this.setup || [];
		no_add(this.setup, setup, "c");
		return this;
	},
	
	/**
	 * Remove setup property.
	 * 
	 * @param {object} setup object with structure: {x:<x coordinate>, y:<y coordinate>}
	 */
	
	removeSetup: function(setup) {
		no_remove(this.setup, setup);
		return this;
	},
	
	/**
	 * Add markup property.
	 * 
	 * @param {object} markup object with structure: {x:<x coordinate>, y:<y coordinate>, type:<type>}
	 */
	
	addMarkup: function(markup) {
		this.markup = this.markup || [];
		no_add(this.markup, markup, "type");
		return this;
	},
	
	/**
	 * Remove markup property.
	 * 
	 * @param {object} markup object with structure: {x:<x coordinate>, y:<y coordinate>}
	 */
	
	removeMarkup: function(markup) {
		no_remove(this.markup, markup);
		return this;
	},
	
	/**
	 * Remove this node.
	 * Node is removed from its parent and children are passed to parent.
	 */
	
	remove: function() {
		var p = this.parent;
		if(!p) throw new Exception("Root node cannot be removed");
		for(var i in p.children) {
			if(p.children[i] == this) {
				p.children.splice(i,1);
				break;
			}
		}
		p.children = p.children.concat(this.children);
		this.parent = null;
		return p;
	},
	
	/**
	 * Insert node after this node. All children are passed to new node.
	 */
	
	insertAfter: function(node) {
		for(var child in this.children) {
			this.children[child].parent = node;
		}
		node.children = node.children.concat(this.children);
		node.parent = this;
		this.children = [node];
		return node;
	},
	
	/**
	 * Append child node to this node.
	 */
	
	appendChild: function(node) {
		node.parent = this;
		this.children.push(node);
		return node;
	},
	
	/**
	 * Get properties as object.
	 */
	
	getProperties: function() {
		var props = {};
		for(var key in this) {
			if(this.hasOwnProperty(key) && key != "children" && key != "parent") props[key] = this[key];
		}
		return props;
	}
}

WGo.KNode = KNode;

var pos_diff = function(old_p, new_p) {
	var size = old_p.size, add = [], remove = [];
	
	for(var i = 0; i < size*size; i++) {
		if(old_p.schema[i] && !new_p.schema[i]) remove.push({x:Math.floor(i/size),y:i%size});
		else if(old_p.schema[i] != new_p.schema[i]) add.push({x:Math.floor(i/size),y:i%size,c:new_p.schema[i]});
	}
	
	return {
		add: add,
		remove: remove
	}
}

/**
 * KifuReader object is capable of reading a kifu nodes and executing them. It contains Game object with actual position.
 * Variable change contains last changes of position.
 * If parameter rememberPath is set, KifuReader will remember last selected child of all nodes.
 * If parameter allowIllegalMoves is set, illegal moves will be played instead of throwing an exception
 */

var KifuReader = function(kifu, rememberPath, allowIllegalMoves) {
	this.kifu = kifu;
	this.node = this.kifu.root;
	this.allow_illegal = allowIllegalMoves || false;
	this.game = new WGo.Game(this.kifu.size, this.allow_illegal ? "NONE" : "KO", this.allow_illegal , this.allow_illegal);
	this.path = {m:0};

	if(this.kifu.info["HA"] && this.kifu.info["HA"] > 1) this.game.turn = WGo.W;
	this.change = exec_node(this.game, this.node, true);
	
	if(rememberPath) this.rememberPath = true;
	else this.rememberPath = false;
}

var set_subtract = function(a, b) {
	var n = [], q;
	for(var i in a) {
		q = true;
		for(var j in b) {
			if(a[i].x == b[j].x && a[i].y == b[j].y) {
				q = false;
				break;
			}
		}
		if(q) n.push(a[i]);
	}
	return n;
}

var concat_changes = function(ch_orig, ch_new) {
	ch_orig.add = set_subtract(ch_orig.add, ch_new.remove).concat(ch_new.add);
	ch_orig.remove = set_subtract(ch_orig.remove, ch_new.add).concat(ch_new.remove);
}

// change game object according to node, return changes
var exec_node = function(game, node, first) {
	if(node.parent) node.parent._last_selected = node.parent.children.indexOf(node);
	
	// handle moves nodes
	if(node.move != undefined) {
		if(node.move.pass) {
			game.pass(node.move.c);
			return {add:[], remove:[]};
		}
		else {
			var res = game.play(node.move.x, node.move.y, node.move.c);
			if(typeof res == "number") throw new InvalidMoveError(res, node);
			// we must check whether to add move (it can be suicide)
			for(var i in res) {
				if(res[i].x == node.move.x && res[i].y == node.move.y) {
					return {
						add: [],
						remove: res
					}
				}
			}
			return {
				add: [node.move],
				remove: res
			}
		}
	}
	// handle other(setup) nodes
	else {
		if(!first) game.pushPosition();
		
		var add = [], remove = [];
		
		if(node.setup != undefined) {
			for(var i in node.setup) {
				if(node.setup[i].c) {
					game.setStone(node.setup[i].x, node.setup[i].y, node.setup[i].c);
					add.push(node.setup[i]);
				}
				else {
					game.removeStone(node.setup[i].x, node.setup[i].y);
					remove.push(node.setup[i]);
				}
			}
		}
		
		if(node.turn) game.turn = node.turn;
		
		return {
			add: add,
			remove: remove
		};
	}
}

var exec_next = function(i) {
	if(i === undefined && this.rememberPath) i = this.node._last_selected;
	i = i || 0;
	var node = this.node.children[i];
	
	if(!node) return false;
	
	var ch = exec_node(this.game, node);
	
	this.path.m++;
	if(this.node.children.length > 1) this.path[this.path.m] = i;
	
	this.node = node;
	return ch;
}

var exec_previous = function() {
	if(!this.node.parent) return false;
	
	this.node = this.node.parent;
	
	this.game.popPosition();
	if(this.node.turn) this.game.turn = this.node.turn;
	
	if(this.path[this.path.m] !== undefined) delete this.path[this.path.m];
	this.path.m--;
	
	return true;
}

var exec_first = function() {
	//if(!this.node.parent) return;
	
	this.game.firstPosition();
	this.node = this.kifu.root;
	
	this.path = {m: 0};
	
	if(this.kifu.info["HA"] && this.kifu.info["HA"] > 1) this.game.turn = WGo.W;
	this.change = exec_node(this.game, this.node, true);
}

KifuReader.prototype = {
	constructor: KifuReader,
	
	/**
	 * Go to next node and if there is a move play it.
	 */
	
	next: function(i) {
		this.change = exec_next.call(this, i);
		return this;
	},

    /**
     * Informs if current position contains follow-up moves
     * @returns {Boolean}
     */

    hasNext: function () {
        return this.node.children && this.node.children.length > 0;
    },
	
	/**
	 * Execute all nodes till the end.
	 */
	
	last: function() {
		var ch;
		this.change = {
			add: [],
			remove: []
		}
		while(ch = exec_next.call(this)) concat_changes(this.change, ch);
		return this;
	},
	
	/**
	 * Return to the previous position (redo actual node) 
	 */
	
	previous: function() {	
		var old_pos = this.game.getPosition();
		exec_previous.call(this);
		this.change = pos_diff(old_pos, this.game.getPosition());
		return this;
	},
	
	/**
	 * Go to the initial position
	 */
	
	first: function() {
		var old_pos = this.game.getPosition();
		exec_first.call(this);		
		this.change = pos_diff(old_pos, this.game.getPosition());
		return this;
	},
	
	/**
	 * Go to position specified by path object
	 */
	
	goTo: function(path) {
		if(path === undefined) return this;
		
		var old_pos = this.game.getPosition();

		exec_first.call(this);
		
		var r;
		
		for(var i = 0; i < path.m; i++) {
			if(!exec_next.call(this, path[i+1])) {
				break;
			}
		}
		
		this.change = pos_diff(old_pos, this.game.getPosition());
		return this;
	},
	
	/**
	 * Go to previous fork (a node with more than one child)
	 */
	
	previousFork: function() {
		var old_pos = this.game.getPosition();
		while(exec_previous.call(this) && this.node.children.length == 1){};
		this.change = pos_diff(old_pos, this.game.getPosition());
		return this;
	},
	
	/**
	 * Shortcut. Get actual position object.
	 */
	
	getPosition: function() {
		return this.game.getPosition();
	},
	
	/**
	 * Allow or disallow illegal moves to be played
	 */
	 
	allowIllegalMoves: function(b) {
		if(b) {
			this.game.allow_rewrite = true;
			this.game.allow_suicide = true;
			this.repeating = "NONE";
		}
		else {
			this.game.allow_rewrite = false;
			this.game.allow_suicide = false;
			this.repeating = "KO";
		}
	}
}

WGo.KifuReader = KifuReader;

// Class handling invalid moves in kifu
var InvalidMoveError = function(code, node) {
	this.name = "InvalidMoveError";
    this.message = "Invalid move in kifu detected. ";
	
	if(node.move && node.move.c !== undefined && node.move.x !== undefined && node.move.y !== undefined) {
		var letter = node.move.x;
		if(node.move.x > 7) letter++;
		letter = String.fromCharCode(letter+65);
		this.message += "Trying to play "+(node.move.c == WGo.WHITE ? "white" : "black")+" move on "+String.fromCharCode(node.move.x+65)+""+(19-node.move.y);
	}
	else this.message += "Move object doesn't contain arbitrary attributes.";
	
	if(code) {
		switch(code) {
			case 1:
				this.message += ", but these coordinates are not on board.";
			break;
			case 2:
				this.message += ", but there already is a stone.";
			break;
			case 3:
				this.message += ", but this move is a suicide.";
			break;
			case 4:
				this.message += ", but this position already occured.";
			break;
		}
	}
	else this.message += "."
}
InvalidMoveError.prototype = new Error();
InvalidMoveError.prototype.constructor = InvalidMoveError;

WGo.InvalidMoveError = InvalidMoveError;

WGo.i18n.en["show"] = "show";
WGo.i18n.en["res-show-tip"] =  "Click to show result.";

})(WGo);
(function(WGo, undefined){

WGo.SGF = {};

var to_num = function(str, i) {
	return str.charCodeAt(i)-97;
}

var sgf_player_info = function(type, black, kifu, node, value, ident) {
	var c = ident == black ? "black" : "white";
	kifu.info[c] = kifu.info[c] || {};
	kifu.info[c][type] = value[0];
}

// handling properties specifically
var properties = WGo.SGF.properties = {}

// Move properties
properties["B"] = properties["W"] = function(kifu, node, value, ident) {
	if(!value[0] || (kifu.size <= 19 && value[0] == "tt")) node.move = {
		pass: true,
		c: ident == "B" ? WGo.B : WGo.W
	};
	else node.move = {
		x: to_num(value[0], 0), 
		y: to_num(value[0], 1), 
		c: ident == "B" ? WGo.B : WGo.W
	};
}
	
// Setup properties
properties["AB"] = properties["AW"] = function(kifu, node, value, ident) {
	for(var i in value) {
		node.addSetup({
			x: to_num(value[i], 0), 
			y: to_num(value[i], 1), 
			c: ident == "AB" ? WGo.B : WGo.W
		});
	}
}
properties["AE"] = function(kifu, node, value) {
	for(var i in value) {
		node.addSetup({
			x: to_num(value[i], 0), 
			y: to_num(value[i], 1), 
		});
	}
}
properties["PL"] = function(kifu, node, value) {
	node.turn = (value[0] == "b" || value[0] == "B") ? WGo.B : WGo.W;
}
	
// Node annotation properties
properties["C"] = function(kifu, node, value) {
	node.comment = value.join();
}
	
// Markup properties
properties["LB"] = function(kifu, node, value) {
	for(var i in value) {
		node.addMarkup({
			x: to_num(value[i],0), 
			y: to_num(value[i],1), 
			type: "LB", 
			text: value[i].substr(3)
		});
	}
}
properties["CR"] = properties["SQ"] = properties["TR"] = properties["SL"] = properties["MA"] = function(kifu, node, value, ident) {
	for(var i in value) {
		node.addMarkup({
			x: to_num(value[i],0), 
			y: to_num(value[i],1), 
			type: ident
		});
	}
}

// Root properties
properties["SZ"] = function(kifu, node, value) {
	kifu.size = parseInt(value[0]);
}
	
// Game info properties
properties["BR"] = properties["WR"] = sgf_player_info.bind(this, "rank", "BR");
properties["PB"] = properties["PW"] = sgf_player_info.bind(this, "name", "PB");
properties["BT"] = properties["WT"] = sgf_player_info.bind(this, "team", "BT");
properties["TM"] =  function(kifu, node, value, ident) {
	kifu.info[ident] = value[0];
	node.BL = value[0];
	node.WL = value[0];
}

var reg_seq = /\(|\)|(;(\s*[A-Z]+\s*((\[\])|(\[(.|\s)*?([^\\]\])))+)*)/g;
var reg_node = /[A-Z]+\s*((\[\])|(\[(.|\s)*?([^\\]\])))+/g;
var reg_ident = /[A-Z]+/;
var reg_props = /(\[\])|(\[(.|\s)*?([^\\]\]))/g;

// parse SGF string, return WGo.Kifu object
WGo.SGF.parse = function(str) { 

	var stack = [],
		sequence, props, vals, ident,
		kifu = new WGo.Kifu(),
		node = null;
		
	// make sequence of elements and process it
	sequence = str.match(reg_seq);
	
	for(var i in sequence) {
		// push stack, if new variant
		if(sequence[i] == "(") stack.push(node);
		
		// pop stack at the end of variant
		else if(sequence[i] == ")") node = stack.pop();
		
		// reading node (string starting with ';')
		else {
			// create node or use root
			if(node) kifu.nodeCount++;
			node = node ? node.appendChild(new WGo.KNode()) : kifu.root;
			
			// make array of properties
			props = sequence[i].match(reg_node) || [];
			kifu.propertyCount += props.length;
			
			// insert all properties to node
			for(var j in props) {
				// get property's identificator
				ident = reg_ident.exec(props[j])[0];
				
				// separate property's values
				vals = props[j].match(reg_props);
				
				// remove additional braces [ and ]
				for(var k in vals) vals[k] = vals[k].substring(1, vals[k].length-1).replace(/\\(?!\\)/g, "");
				
				// call property handler if any
				if(WGo.SGF.properties[ident]) WGo.SGF.properties[ident](kifu, node, vals, ident);
				else {
					// if there is only one property, strip array
					if(vals.length <= 1) vals = vals[0];
					
					// default node property saving
					if(node.parent) node[ident] = vals;
					
					// default root property saving
					else {
						kifu.info[ident] = vals;
					}
				}
			}
		}
	}
	
	return kifu;		
}
})(WGo);
(function(WGo){

"use strict";

var FileError = function(path, code) {
	this.name = "FileError";

    if(code == 1) this.message = "File '"+path+"' is empty.";
	else if(code == 2) this.message = "Network error. It is not possible to read '"+path+"'.";
	else this.message = "File '"+path+"' hasn't been found on server.";
};

FileError.prototype = new Error();
FileError.prototype.constructor = FileError;

WGo.FileError = FileError;

// ajax function for loading of files
var loadFromUrl = WGo.loadFromUrl = function(url, callback) {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				if(xmlhttp.responseText.length == 0) {
					throw new FileError(url, 1);
				}
				else {
					callback(xmlhttp.responseText);
				}
			}
			else {
				throw new FileError(url);
			}
		}
	}
	
	try {
		xmlhttp.open("GET", url, true);
		xmlhttp.send();	
	}
	catch(err) {
		throw new FileError(url, 2);
	}
	
};

// basic updating function - handles board changes
var update_board = function(e) {
	// update board's position
	if(e.change) this.board.update(e.change);
	
	// remove old markers from the board
	if(this.temp_marks) this.board.removeObject(this.temp_marks);
	
	// init array for new objects
	var add = [];
	
	this.notification();
	
	// add current move marker
	if(e.node.move && this.config.markLastMove) {
		if(e.node.move.pass) this.notification(WGo.t((e.node.move.c == WGo.B ? "b" : "w")+"pass"));
		else add.push({
			type: "CR",
			x: e.node.move.x, 
			y: e.node.move.y
		});
	}
	
	// add variation letters
    if (this.config.showVariations !== false || this.config.showNextMove) {
        if (e.node.children.length > 1 || this.config.showNextMove) {
            for (var i = 0; i < e.node.children.length; i++) {
                if (e.node.children[i].move && !e.node.children[i].move.pass) {
                    add.push({
                        type: "LB",
                        text: String.fromCharCode(65 + i),
                        x:    e.node.children[i].move.x,
                        y:    e.node.children[i].move.y,
                        c:    "rgba(0,32,128,0.8)"
                    });
                }
            }
        }
    }
	
	// add other markup
	if(e.node.markup) {
		for(var i in e.node.markup) {
			for(var j = 0; j < add.length; j++) {
				if(e.node.markup[i].x == add[j].x && e.node.markup[i].y == add[j].y) {
					add.splice(j,1);
					j--;
				}
			}
		}
		add = add.concat(e.node.markup);
	}
	
	// add new markers on the board
	this.temp_marks = add;
	this.board.addObject(add);
};

// preparing board
var prepare_board = function(e) {
	// set board size
	this.board.setSize(e.kifu.size);
	
	// remove old objects
	this.board.removeAllObjects();
	
	// activate wheel
	if(this.config.enableWheel) this.setWheel(true);
};

// detecting scrolling of element - e.g. when we are scrolling text in comment box, we want to be aware. 
var detect_scrolling = function(node, bp) {
	if(node == bp.element || node == bp.element) return false;
	else if(node._wgo_scrollable || (node.scrollHeight > node.offsetHeight)) return true;
	else return detect_scrolling(node.parentNode, bp);
};

// mouse wheel event callback, for replaying a game
var wheel_lis = function(e) {
	var delta = e.wheelDelta || e.detail*(-1);
	
	// if there is scrolling in progress within an element, don't change position
	if(detect_scrolling(e.target, this)) return true;
	
	if(delta < 0) {
		this.next();
		if(this.config.lockScroll && e.preventDefault) e.preventDefault();
		return !this.config.lockScroll;
	}
	else if(delta > 0) {
		this.previous();
		if(this.config.lockScroll && e.preventDefault) e.preventDefault();
		return !this.config.lockScroll;
	}
	return true;
};

// keyboard click callback, for replaying a game
var key_lis = function(e) {
	if(document.querySelector(":focus")) return true;
	
	switch(e.keyCode) {
		case 39: this.next(); break;
		case 37: this.previous(); break;
		//case 40: this.selectAlternativeVariation(); break;
		default: return true;
	}
	if(this.config.lockScroll && e.preventDefault) e.preventDefault()
	return !this.config.lockScroll;
};

// function handling board clicks in normal mode
var board_click_default = function(x,y) {
    if (this.config.noClick) return false;
	if(!this.kifuReader || !this.kifuReader.node) return false;

    var c = this.kifuReader.game.turn,
        moveValidityStatus = this.kifuReader.game.play(x, y, c, true),
        kifuPathIndex = -1;

    if (typeof moveValidityStatus == 'number') {
        quickDispatchEvent.call(this, "illegal", { error: moveValidityStatus });
        return false;
    }

    // try to find if the move is included in kifu
    this.kifuReader.node.children.forEach(function (child, index) {
        if (child.move.x == x && child.move.y == y) {
            kifuPathIndex = index;
            return false;
        }
    }, this);

    // if move in kifu - play it
    if (kifuPathIndex > -1) {
        this.next(kifuPathIndex);
        quickDispatchEvent.call(this, "played");

    // if move is not in kifu
    } else if (this.config.showNotInKifu) {

        appendNodeAndPlay.call(this, new WGo.KNode({
            move: {
                x: x,
                y: y,
                c: c
            }
        }));
        quickDispatchEvent.call(this, "played");

    } else {
        quickDispatchEvent.call(this, "notinkifu");
        return false; // no auto-respond is supported in this case
    }

    if (this.config.autoRespond) {

        // if there is response in kifu
        if (this.kifuReader.node.children.length) {
            delay.call(this, function () {
                this.next(0);
                quickDispatchEvent.call(this, "responded");

                if (!this.kifuReader.node.children.length) {
                    quickDispatchEvent.call(this, "nomoremoves");
                }
            }, this.config.responseDelay);

        } else {

            var response = null;

            if (kifuPathIndex === -1) {
                // find children with pas, if found, get next move as a response
                this.kifuReader.node.parent.children.forEach(function (child) {
                    if (child.move.pass) {
                        response = child.children[0];
                        return false;
                    }
                }, this);
            }

            if (response) {
                delay.call(this, function () {
                    appendNodeAndPlay.call(this, response);
                    quickDispatchEvent.call(this, "responded");

                    if (!response.children.length) {
                        quickDispatchEvent.call(this, "nomoremoves");
                    }
                }, this.config.responseDelay);
            } else {
                quickDispatchEvent.call(this, "noresponse");
                quickDispatchEvent.call(this, "nomoremoves");
            }
        }

    } else if (this.config.autoPass) {
        delay.call(this, function () {
            appendNodeAndPlay.call(this, new WGo.KNode({
                move: {
                    pass: true
                }
            }));
            quickDispatchEvent.call(this, "responded");
            quickDispatchEvent.call(this, "nomoremoves");
        }, this.config.responseDelay);
    }
};

/**
 * Quick event dispatcher
 * @param {String} event
 * @param {Object} [extraParams]
 */
function quickDispatchEvent(event, extraParams) {
    var params = {
        type: event,
        target: this,
        node: this.kifuReader.node,
        position: this.kifuReader.getPosition(),
        path: this.kifuReader.path,
        change: this.kifuReader.change
    };

    if (extraParams) {
        for (var p in extraParams) {
            if (extraParams.hasOwnProperty(p)) {
                params[p] = extraParams[p];
            }
        }
    }

    this.dispatchEvent(params);
}

function appendNodeAndPlay(node) {
    this.kifuReader.node.appendChild(node);
    this.next(this.kifuReader.node.children.length - 1);
}

function delay(callback, delay) {
    var self = this,
        prevNoClickState = this.config.noClick;

    if (delay > 0) {
        self.config.noClick = true;
        setTimeout(function () {
            self.config.noClick = prevNoClickState;
            callback.call(self);
        }, delay);
    } else {
        callback.call(self);
    }
}

// coordinates drawing handler - adds coordinates on the board
/*var coordinates = {
	grid: {
		draw: function(args, board) {
			var ch, t, xright, xleft, ytop, ybottom;
			
			this.fillStyle = "rgba(0,0,0,0.7)";
			this.textBaseline="middle";
			this.textAlign="center";
			this.font = board.stoneRadius+"px "+(board.font || "");
			
			xright = board.getX(-0.75);
			xleft = board.getX(board.size-0.25);
			ytop = board.getY(-0.75);
			ybottom = board.getY(board.size-0.25);
			
			for(var i = 0; i < board.size; i++) {
				ch = i+"A".charCodeAt(0);
				if(ch >= "I".charCodeAt(0)) ch++;
				
				t = board.getY(i);
				this.fillText(board.size-i, xright, t);
				this.fillText(board.size-i, xleft, t);
				
				t = board.getX(i);
				this.fillText(String.fromCharCode(ch), t, ytop);
				this.fillText(String.fromCharCode(ch), t, ybottom);
			}
			
			this.fillStyle = "black";
		}
	}
}*/

/**
 * We can say this class is abstract, stand alone it doesn't do anything. 
 * However it is useful skelet for building actual player's GUI. Extend this class to create custom player template.
 * It controls board and inputs from mouse and keyboard, but everything can be overriden.
 *
 * Possible configurations:
 *  - sgf: sgf string (default: undefined)
 *  - json: kifu stored in json/jgo (default: undefined)
 *  - sgfFile: sgf file path (default: undefined)
 *  - board: configuration object of board (default: {})
 *  - enableWheel: allow player to be controlled by mouse wheel (default: true)
 *  - lockScroll: disable window scrolling while hovering player (default: true),
 *  - enableKeys: allow player to be controlled by arrow keys (default: true),
 *  - markLastMove: marks the last move with a circle (default: true),
 *
 * @param {object} config object if form: {key1: value1, key2: value2, ...}
 */

var Player = function(config) {
	this.config = config;
	
	// add default configuration
	for(var key in Player.default) if(this.config[key] === undefined && Player.default[key] !== undefined) this.config[key] = Player.default[key];
	
	this.element = document.createElement("div");
	this.board = new WGo.Board(this.element, this.config.board);
	
	this.init();
	this.initGame();
};

Player.prototype = {
	constructor: Player,
	
	/**
	 * Init player. If you want to call this method PlayerView object must have these properties: 
	 *  - player - WGo.Player object
	 *  - board - WGo.Board object (or other board renderer)
	 *  - element - main DOMElement of player
	 */
	 
	init: function() {
		// declare kifu
		this.kifu = null;
		
		// creating listeners
		this.listeners = {
			kifuLoaded: [prepare_board.bind(this)],
			update: [update_board.bind(this)],
			frozen: [],
			unfrozen: [],
		};
		
		if(this.config.kifuLoaded) this.addEventListener("kifuLoaded", this.config.kifuLoaded);
		if(this.config.update) this.addEventListener("update", this.config.update);
		if(this.config.frozen) this.addEventListener("frozen", this.config.frozen);
		if(this.config.unfrozen) this.addEventListener("unfrozen", this.config.unfrozen);
        if(this.config.notinkifu) this.addEventListener("notinkifu", this.config.notinkifu);
        if(this.config.nomoremoves) this.addEventListener("nomoremoves", this.config.notinkifu);
		
		this.board.addEventListener("click", board_click_default.bind(this));
		this.element.addEventListener("click", this.focus.bind(this));
		
		this.focus();
	},
	
	initGame: function() {
		// try to load game passed in configuration
		if(this.config.sgf) {
			this.loadSgf(this.config.sgf, this.config.move);
		}
		else if(this.config.json) {
			this.loadJSON(this.config.json, this.config.move);
		}
		else if(this.config.sgfFile) {
			this.loadSgfFromFile(this.config.sgfFile, this.config.move);
		}

	},
	
	/**
	 * Create update event and dispatch it. It is called after position's changed.
	 *
	 * @param {string} op an operation that produced update (e.g. next, previous...)
	 */
	
	update: function(op) {
		if(!this.kifuReader || !this.kifuReader.change) return;
		
		var ev = {
			type: "update",
			op: op,
			target: this,
			node: this.kifuReader.node,
			position: this.kifuReader.getPosition(),
			path: this.kifuReader.path,
			change: this.kifuReader.change
		};
		
		//if(!this.kifuReader.node.parent) ev.msg = this.getGameInfo();

		this.dispatchEvent(ev);
	},

    /**
     * Resets player
     */
    reset: function () {
        this.kifuReader.goTo(0);
        this.update();
    },
	
	/**
	 * Prepare kifu for replaying. Event 'kifuLoaded' is triggered.
	 *
	 * @param {WGo.Kifu} kifu object
	 * @param {Array} path array
	 */
	
	loadKifu: function(kifu, path) {
		this.kifu = kifu;

		// kifu is replayed by KifuReader, it manipulates a Kifu object and gets all changes
		this.kifuReader = new WGo.KifuReader(this.kifu, this.config.rememberPath, this.config.allowIllegalMoves);
		
		// fire kifu loaded event
		this.dispatchEvent({
			type: "kifuLoaded",
			target: this,
			kifu: this.kifu,
		});
		
		// handle permalink
		/*if(this.config.permalinks) {
			if(!permalinks.active) init_permalinks();
			if(permalinks.query.length && permalinks.query[0] == this.view.element.id) {
				handle_hash(this);
			}
		}*/
		
		// update player - initial position in kifu doesn't have to be an empty board
		this.update("init");
		
		if(path) {
			this.goTo(path);
		}
		
		/*if(this.kifu.nodeCount === 0) this.error("");
		else if(this.kifu.propertyCount === 0)*/

	},
	
	/**
	 * Load go kifu from sgf string.
	 *
	 * @param {string} sgf
	 */
	 
	loadSgf: function(sgf, path) {
		try {
			this.loadKifu(WGo.Kifu.fromSgf(sgf), path);
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Load go kifu from JSON object.
	 */
	
	loadJSON: function(json, path) {
		try {
			this.loadKifu(WGo.Kifu.fromJGO(json), path);
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Load kifu from sgf file specified with path. AJAX is used to load sgf content. 
	 */
	
	loadSgfFromFile: function(file_path, game_path) {
		var _this = this;
		try {
			loadFromUrl(file_path, function(sgf) {
				_this.loadSgf(sgf, game_path);
			});
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Implementation of EventTarget interface, though it's a little bit simplified.
	 * You need to save listener if you would like to remove it later.
	 *
	 * @param {string} type of listeners
	 * @param {Function} listener callback function
	 */

	addEventListener: function(type, listener) {
		this.listeners[type] = this.listeners[type] || [];
		this.listeners[type].push(listener);
	},
	
	/**
	 * Remove event listener previously added with addEventListener.
	 *
	 * @param {string} type of listeners
	 * @param {Function} listener function
	 */
	
	removeEventListener: function(type, listener) {
		if(!this.listeners[type]) return;
		var i = this.listeners[type].indexOf(listener);
		if(i != -1) this.listeners[type].splice(i,1);
	},
	
	/**
	 * Dispatch an event. In default there are two events: "kifuLoaded" and "update"
	 * 
	 * @param {string} evt event
	 */
	 
	dispatchEvent: function(evt) {
		if(!this.listeners[evt.type]) return;
		for(var l in this.listeners[evt.type]) this.listeners[evt.type][l](evt);
	},
	
	/**
	 * Output function for notifications.
 	 */
	
	notification: function(text) {
		if(console) console.log(text);
	},
	
	/**
	 * Output function for helps.
 	 */
	
	help: function(text) {
		if(console) console.log(text);
	},
	
	/**
	 * Output function for errors. TODO: reporting of errors - by cross domain AJAX
	 */
	
	error: function(err) {
		if(!WGo.ERROR_REPORT) throw err;
		
		if(console) console.log(err);
	
	},
	
	/**
	 * Play next move.
	 * 
	 * @param {number} i if there is more option, you can specify it by index
	 */
	
	next: function(i) {
		if(this.frozen || !this.kifu) return;
		
		try {
			this.kifuReader.next(i);
			this.update();
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Get previous position.
	 */
	
	previous: function() {
		if(this.frozen || !this.kifu) return;
		
		try{
			this.kifuReader.previous();
			this.update();
		}
		catch(err) {
			this.error(err);
		}
	},

	/**
	 * Play all moves and get last position.
	 */
	
	last: function() {
		if(this.frozen || !this.kifu) return;
		
		try {
			this.kifuReader.last();
			this.update();
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Get a first position.
	 */
	
	first: function() {
		if(this.frozen || !this.kifu) return;
		
		try {
			this.kifuReader.first();
			this.update();
		}
		catch(err) {
			this.error(err);
		}
	},

	/**
	 * Go to a specified move.
	 * 
	 * @param {number|Array} move number of move, or path array
	 */
	
	goTo: function(move) {
		if(this.frozen || !this.kifu) return;
		var path;
		if(typeof move == "function") move = move.call(this);
		
		if(typeof move == "number") {
			path = WGo.clone(this.kifuReader.path);
			path.m = move || 0;
		}
		else path = move;
		
		try {
			this.kifuReader.goTo(path);
			this.update();
		}
		catch(err) {
			this.error(err);
		}
	},
	
	/**
	 * Get information about actual game(kifu)
	 *
	 * @return {Object} game info
	 */
	 
	getGameInfo: function() {
		if(!this.kifu) return null;
		var info = {};
		for(var key in this.kifu.info) {
			if(WGo.Kifu.infoList.indexOf(key) == -1) continue;
			if(WGo.Kifu.infoFormatters[key]) {
				info[WGo.t(key)] = WGo.Kifu.infoFormatters[key](this.kifu.info[key]);
			}
			else info[WGo.t(key)] = WGo.filterHTML(this.kifu.info[key]);
		}
		return info;
	},
	
	/**
	 * Freeze or onfreeze player. In frozen state methods: next, previous etc. don't work.
	 */
	
	setFrozen: function(frozen) {
		this.frozen = frozen;
		this.dispatchEvent({
			type: this.frozen ? "frozen" : "unfrozen",
			target: this,
		});
	},
	
	/**
	 * Append player to given element.
	 */
	
	appendTo: function(elem) {
		elem.appendChild(this.element);
	},
	
	/**
	 * Get focus on the player
	 */
	
	focus: function() {
		if(this.config.enableKeys) this.setKeys(true);
	},
	
	/**
	 * Set controlling of player by arrow keys.
	 */
	 
	setKeys: function(b) {
		if(b) {
			document.onkeydown = key_lis.bind(this);
		}
		else {
			document.onkeydown = null;
		}
	},
	
	/**
	 * Set controlling of player by mouse wheel.
	 */
	
	setWheel: function(b) {
		if(!this._wheel_listener && b) {
			this._wheel_listener = wheel_lis.bind(this);
			var type = (document.onmousewheel !== undefined) ? "mousewheel" : "DOMMouseScroll";
			this.element.addEventListener(type, this._wheel_listener);
		}
		else if(this._wheel_listener && !b) {
			var type = (document.onmousewheel !== undefined) ? "mousewheel" : "DOMMouseScroll";
			this.element.removeEventListener(type, this._wheel_listener);
			delete this._wheel_listener;
		}
	}, 
	
	/**
	 * Toggle coordinates around the board.
	 */
	 
	setCoordinates: function(b) {
		if(!this.coordinates && b) {
			this.board.setSection(-0.5, -0.5, -0.5, -0.5);
			this.board.addCustomObject(WGo.Board.coordinates);
		}
		else if(this.coordinates && !b) {
			this.board.setSection(0, 0, 0, 0);
			this.board.removeCustomObject(WGo.Board.coordinates);
		}
		this.coordinates = b;
	}
};

Player.default = {
	sgf: undefined,
	json: undefined,
	sgfFile: undefined,
    problemSgf: undefined,
    problemSgfFile: undefined,
	move: undefined,
	board: {},
	enableWheel: true,
	lockScroll: true,
	enableKeys: true,
	rememberPath: true,
	kifuLoaded: undefined,
	update: undefined,
	frozen: undefined,
	unfrozen: undefined,
	allowIllegalMoves: false,
	markLastMove: true,
    showVariations: true,
    showNextMove: false,
    autoRespond: false,
    autoPass: false,
    showNotInKifu: false,
    notinkifu: undefined,
    nomoremoves: undefined,
    responseDelay: 400,
    noClick: false
};

WGo.Player = Player;

//--- i18n support ------------------------------------------------------------------------------------------

/**
 * For another language support, extend this object with similiar object.
 */
 
var player_terms = {
	"about-text": "<h1>WGo.js Player 2.0</h1>"
				+ "<p>WGo.js Player is extension of WGo.js, HTML5 library for purposes of game of go. It allows to replay go game records and it has many features like score counting. It is also designed to be easily extendable.</p>"
				+ "<p>WGo.js is open source licensed under <a href='http://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>. You can use and modify any code from this project.</p>"
				+ "<p>You can find more information at <a href='http://wgo.waltheri.net/player' target='_blank'>wgo.waltheri.net/player</a></p>"
				+ "<p>Copyright &copy; 2013 Jan Prokop</p>",
	"black": "Black",
	"white": "White",
	"DT": "Date",
	"KM": "Komi",
	"HA": "Handicap",
	"AN": "Annotations",
	"CP": "Copyright",
	"GC": "Game comments",
	"GN": "Game name",
	"ON": "Fuseki",
	"OT": "Overtime",
	"TM": "Basic time",
	"RE": "Result",
	"RO": "Round",
	"RU": "Rules",
	"US": "Recorder",
	"PC": "Place",
	"EV": "Event",
	"SO": "Source",
	"none": "none",
	"bpass": "Black passed."
};

for(var key in player_terms) WGo.i18n.en[key] = player_terms[key];

}(WGo));
(function(WGo){

"use strict";

// player counter - for creating unique ids
var pl_count = 0;

// generate DOM of region
var playerBlock = function(name, parent, visible) {
	var e = {};
	e.element = document.createElement("div");
	e.element.className = "wgo-player-"+name;
	e.wrapper = document.createElement("div");
	e.wrapper.className = "wgo-player-"+name+"-wrapper";
	e.element.appendChild(e.wrapper);
	parent.appendChild(e.element);
	if(!visible) e.element.style.display = "none";
	return e;
}

// generate all DOM of player
var BPgenerateDom = function() {
	// wrapper object for common DOM
	this.dom = {};
	
	// center element
	this.dom.center = document.createElement("div");
	this.dom.center.className = "wgo-player-center";
	
	// board wrapper element
	this.dom.board = document.createElement("div");
	this.dom.board.className = "wgo-player-board";
	
	// object wrapper for regions (left, right, top, bottom)
	this.regions = {};
	
	/*
	pseudo DOM structure:
	<main>
		<left></left>
		<center>
			<top></top>
			<board></board>
			<bottom></bottom>
		</center>
		<right></right>
	</main>
	*/
	
	this.regions.left = playerBlock("left", this.element);
	this.element.appendChild(this.dom.center);
	this.regions.right = playerBlock("right", this.element);
	
	this.regions.top = playerBlock("top", this.dom.center);
	this.dom.center.appendChild(this.dom.board);
	this.regions.bottom = playerBlock("bottom", this.dom.center);
}

var getCurrentLayout = function() {
	var cl = this.config.layout;
	if(cl.constructor != Array) return cl;
	
	var bh = this.height || this.maxHeight;
	for(var i = 0; i < cl.length; i++) {
		
		if(!cl[i].conditions || (
			(!cl[i].conditions.minWidth || cl[i].conditions.minWidth <= this.width) &&
			(!cl[i].conditions.minHeight || !bh || cl[i].conditions.minHeight <= bh) &&
			(!cl[i].conditions.maxWidth || cl[i].conditions.maxWidth >= this.width) &&
			(!cl[i].conditions.maxHeight || !bh || cl[i].conditions.maxHeight >= bh) &&
			(!cl[i].conditions.custom || cl[i].conditions.custom.call(this))
		  )) {
			return cl[i];
		}
	}
}

var appendComponents = function(area) {
	var components;
	
	if(this.currentLayout.layout) components = this.currentLayout.layout[area];
	else components = this.currentLayout[area];
	
	if(components) {
		this.regions[area].element.style.display = "block";
		
		if(components.constructor != Array) components = [components];
		
		for(var i in components) {
			if(!this.components[components[i]]) this.components[components[i]] = new BasicPlayer.component[components[i]](this);
			
			this.components[components[i]].appendTo(this.regions[area].wrapper);
			
			// remove detach flag
			this.components[components[i]]._detachFromPlayer = false;
		}
	}
	else {
		this.regions[area].element.style.display = "none";
	}

}

var manageComponents = function() {
	// add detach flags to every widget
	for(var key in this.components) {
		this.components[key]._detachFromPlayer = true;
	}
	
	appendComponents.call(this, "left");
	appendComponents.call(this, "right");
	appendComponents.call(this, "top");
	appendComponents.call(this, "bottom");
	
	// detach all invisible components
	for(var key in this.components) {
		if(this.components[key]._detachFromPlayer && this.components[key].element.parentNode) this.components[key].element.parentNode.removeChild(this.components[key].element);
	}
}

/**
 * Main object of player, it binds all magic together and produces visible player.
 * It inherits some functionality from WGo.Player, but full html structure is done here.
 *
 * Layout of player can be set. It can be even dynamic according to screen resolution. 
 * There are 5 areas - left, right, top and bottom, and there is special region for board.
 * You can put BasicPlayer.Component objects to these regions. Basic components are: 
 *  - BasicPlayer.CommentBox - box with comments and game informations
 *  - BasicPlayer.InfoBox - box with information about players
 *  - BasicPlayer.Control - buttons and staff for control
 *
 * Possible configurations:
 *  - sgf: sgf string (default: undefined)
 *  - json: kifu stored in json/jgo (default: undefined)
 *  - sgfFile: sgf file path (default: undefined)
 *  - board: configuration object of board (default: {})
 *  - enableWheel: allow player to be controlled by mouse wheel (default: true)
 *  - lockScroll: disable window scrolling while hovering player (default: true)
 *  - enableKeys: allow player to be controlled by arrow keys (default: true)
 *  - kifuLoaded: extra Player's kifuLoaded event listener (default: undefined)
 *  - update: extra Player's update event listener (default: undefined)
 *  - frozen: extra Player's frozen event listener (default: undefined)
 *  - unfrozen: extra Player's unfrozen event listener (default: undefined)
 *  - layout: layout object. Look below how to define your own layout (default: BasicPlayer.dynamicLayout)
 *
 * You also must specify main DOMElement of player. 
 */

var BasicPlayer = WGo.extendClass(WGo.Player, function(elem, config) {
	this.config = config;
	
	// add default configuration of BasicPlayer
	for(var key in BasicPlayer.default) if(this.config[key] === undefined && BasicPlayer.default[key] !== undefined) this.config[key] = BasicPlayer.default[key];
	// add default configuration of Player class
	for(var key in WGo.Player.default) if(this.config[key] === undefined && WGo.Player.default[key] !== undefined) this.config[key] = WGo.Player.default[key];

    if (this.config.problemSgfFile || this.config.problemSgf) {

        if (this.config.problemSgf) {
            this.config.sgf = this.config.problemSgf;
        } else {
            this.config.sgfFile = this.config.problemSgfFile;
        }

        this.config.enableWheel = false;
        this.config.lockScroll = false;
        this.config.enableKeys = false;
        this.config.rememberPath = false;
        this.config.showVariations = false;
        this.config.autoRespond = true;
        this.config.kifuReader = true;
        this.config.showNotInKifu = true;
        this.config.layout = {
            left:   [],
            bottom: [],
            top:    [],
            right:  []
        }
    }
	
	this.element = elem
	this.element.innerHTML = "";
	this.classes = (this.element.className ? this.element.className+" " : "")+"wgo-player-main" ;
	this.element.className = this.classes;
	if(!this.element.id) this.element.id = "wgo_"+(pl_count++);
	
	BPgenerateDom.call(this);
	
	this.board = new WGo.Board(this.dom.board, this.config.board);
	
	this.init();
	
	this.components = {};
	
	window.addEventListener("resize", function() {
		if(!this.noresize) {
			this.updateDimensions();
		}
		
	}.bind(this));
	
	this.updateDimensions();
	
	this.initGame();
});

/**
 * Append player to different element.
 */
 
BasicPlayer.prototype.appendTo = function(elem) {
	elem.appendChild(this.element);
	this.updateDimensions();
}

/**
 * Set right dimensions of all elements.
 */
	
BasicPlayer.prototype.updateDimensions = function() {
	var css = window.getComputedStyle(this.element);
	
	var els = [];
	while(this.element.firstChild) {
		els.push(this.element.firstChild);
		this.element.removeChild(this.element.firstChild);
	}
	
	var tmp_w = parseInt(css.width);
	var tmp_h = parseInt(css.height);
	var tmp_mh = parseInt(css.maxHeight) || 0;

	for(var i = 0; i < els.length; i++) {
		this.element.appendChild(els[i]);
	}

	if(tmp_w == this.width && tmp_h == this.height && tmp_mh == this.maxHeight) return;
	
	this.width = tmp_w;
	this.height = tmp_h;
	this.maxHeight = tmp_mh;

	this.currentLayout = getCurrentLayout.call(this);

	if(this.currentLayout && this.lastLayout != this.currentLayout) {
		if(this.currentLayout.className) this.element.className = this.classes+" "+this.currentLayout.className;
		else this.element.className = this.classes;
		manageComponents.call(this);
		this.lastLayout = this.currentLayout;
	}
	
	//var bw = this.width - this.regions.left.element.clientWidth - this.regions.right.element.clientWidth;
	var bw = this.dom.board.clientWidth;
	var bh = this.height || this.maxHeight;

	if(bh) {
		bh -= this.regions.top.element.offsetHeight + this.regions.bottom.element.offsetHeight;
	}
	
	if(bh && bh < bw) {
		if(bh != this.board.height) this.board.setHeight(bh);
	}
	else {
		if(bw != this.board.width) this.board.setWidth(bw);
	}
	
	var diff = bh - bw;
	
	if(diff > 0) {
		this.dom.board.style.height = bh+"px";
		this.dom.board.style.paddingTop = (diff/2)+"px";
	}
	else {
		this.dom.board.style.height = "auto";
		this.dom.board.style.paddingTop = "0";
	}
	
	this.regions.left.element.style.height = this.dom.center.offsetHeight+"px";
	this.regions.right.element.style.height = this.dom.center.offsetHeight+"px";

	for(var i in this.components) {
		if(this.components[i].updateDimensions) this.components[i].updateDimensions();
	}
}
	
/**
 * Layout contains built-in info box, for displaying of text(html) messages.
 * You can use this method to display a message.
 * 
 * @param text or html to display
 * @param closeCallback optional callback function which is called when message is closed
 */

BasicPlayer.prototype.showMessage = function(text, closeCallback, permanent) {
	this.info_overlay = document.createElement("div");
	this.info_overlay.style.width = this.element.offsetWidth+"px";
	this.info_overlay.style.height = this.element.offsetHeight+"px";
	this.info_overlay.className = "wgo-info-overlay";
	this.element.appendChild(this.info_overlay);
	
	var info_message = document.createElement("div");
	info_message.className = "wgo-info-message";
	info_message.innerHTML = text;
	
	var close_info = document.createElement("div");
	close_info.className = "wgo-info-close";
	if(!permanent) close_info.innerHTML = WGo.t("BP:closemsg");
	
	info_message.appendChild(close_info);
	
	this.info_overlay.appendChild(info_message);
	
	if(closeCallback) {
		this.info_overlay.addEventListener("click",function(e) {
			closeCallback(e);
		});
	}
	else if(!permanent) {
		this.info_overlay.addEventListener("click",function(e) {
			this.hideMessage();
		}.bind(this));
	}
	
	this.setFrozen(true);
}

/**
 * Hide a message box.
 */
 
BasicPlayer.prototype.hideMessage = function() {
	this.element.removeChild(this.info_overlay);
	this.setFrozen(false);
}

/**
 * Error handling
 */

BasicPlayer.prototype.error = function(err) {
	if(!WGo.ERROR_REPORT) throw err;
	
	var url = "#";
	
	switch(err.name) {
		case "InvalidMoveError": 
			this.showMessage("<h1>"+err.name+"</h1><p>"+err.message+"</p><p>If this message isn't correct, please report it by clicking <a href=\""+url+"\">here</a>, otherwise contact maintainer of this site.</p>");
		break;
		case "FileError":
			this.showMessage("<h1>"+err.name+"</h1><p>"+err.message+"</p><p>Please contact maintainer of this site. Note: it is possible to read files only from this host.</p>");
		break;
		default:
			this.showMessage("<h1>"+err.name+"</h1><p>"+err.message+"</p><pre>"+err.stacktrace+"</pre><p>Please contact maintainer of this site. You can also report it <a href=\""+url+"\">here</a>.</p>");
	}
} 

BasicPlayer.component = {};

/**
 * Preset layouts
 * They have defined regions as arrays, which can contain components. For each of these layouts each component specifies where it is placed.
 * You can create your own layout in same manners, but you must specify components manually.
 */
 
BasicPlayer.layouts = {
	"one_column": {
		top: [],
		bottom: [],
	},
	"no_comment": {
		top: [],
		bottom: [],
	},
	"right_top": {
		top: [],
		right: [],
	},
	"right": {
		right: [],
	},
	"minimal": {
		bottom: []
	},
};

/**
 * WGo player can have more layouts. It allows responsive design of the player.
 * Possible layouts are defined as array of object with this structure:
 * 
 * layout = {
 *   Object layout, // layout as specified above
 *   Object conditions, // conditions that has to be valid to apply this layout
 *   String className // custom classnames
 * }
 *
 * possible conditions:
 *  - minWidth - minimal width of player in px
 *  - maxWidth - maximal width of player in px
 *  - minHeight - minimal height of player in px
 *  - maxHeight - maximal height of player in px
 *  - custom - function which is called in template context, must return true or false
 *
 * Player's template evaluates layouts step by step and first layout that matches the conditions is applied.
 *
 * Look below at the default dynamic layout. Layouts are tested after every window resize.
 */

BasicPlayer.dynamicLayout = [
	{
		conditions: {
			minWidth: 650,
		},
		layout: BasicPlayer.layouts["right_top"], 
		className: "wgo-twocols wgo-large",
	},
	{
		conditions: {
			minWidth: 550,
			minHeight: 600,
		},
		layout: BasicPlayer.layouts["one_column"],
		className: "wgo-medium"
	},
	{
		conditions: {
			minWidth: 350,
		},
		layout: BasicPlayer.layouts["no_comment"],
		className: "wgo-small"
	},
	{	// if conditions object is omitted, layout is applied 
		layout: BasicPlayer.layouts["no_comment"],
		className: "wgo-xsmall",
	},
];

// default settings, they are merged with user settings in constructor.
BasicPlayer.default = {
	layout: BasicPlayer.dynamicLayout,
}

WGo.i18n.en["BP:closemsg"] = "click anywhere to close this window";

//--- Handling <div> with HTML5 data attributes -----------------------------------------------------------------

BasicPlayer.attributes = {
	"data-wgo": function(value) {
		if(value) {
			if(value[0] == "(") this.sgf = value;
			else this.sgfFile = value;
		}
	},

    "data-wgo-problem": function (value) {
        if (value.toLowerCase() != "false") {
            this.enableWheel = false;
            this.lockScroll = false;
            this.enableKeys = false;
            this.rememberPath = false;
            this.showVariations = false;
            this.autoRespond = true;
            this.kifuReader = true;
            this.showNotInKifu = true,
            this.layout = {
                left:   [],
                bottom: [],
                top:    [],
                right:  []
            }
        }
    },
	
	"data-wgo-board": function(value) {
		// using eval to parse strings like "stoneStyle: 'painted'"
		this.board = eval("({"+value+"})");
	},
	
	"data-wgo-onkifuload": function(value) {
		this.kifuLoaded = new Function(value);
	},
	
	"data-wgo-onupdate": function(value) {
		this.update = new Function(value);
	},
	
	"data-wgo-onfrozen": function(value) {
		this.frozen = new Function(value);
	},
	
	"data-wgo-onunfrozen": function(value) {
		this.unfrozen = new Function(value);
	},

    "data-wgo-notinkifu": function (value) {
        this.notinkifu = new Function(value);
    },

    "data-wgo-nomoremoves": function (value) {
        this.nomoremoves = new Function(value);
    },
	
	"data-wgo-layout": function(value) {
		this.layout = eval("({"+value+"})");
	},
	
	"data-wgo-enablewheel": function(value) {
		if(value.toLowerCase() == "false") this.enableWheel = false;
	},
	
	"data-wgo-lockscroll": function(value) {
		if(value.toLowerCase() == "false") this.lockScroll = false;
	},
	
	"data-wgo-enablekeys": function(value) {
		if(value.toLowerCase() == "false") this.enableKeys = false;
	},
	
	"data-wgo-rememberpath": function(value) {
		if(value.toLowerCase() == "false") this.rememberPath = false;
	},
	
	"data-wgo-allowillegal": function(value) {
		if(value.toLowerCase() != "false") this.allowIllegalMoves = true;
	},
	
	"data-wgo-move": function(value) {
		var m = parseInt(value);
		if(m) this.move = m;
		else this.move = eval("({"+value+"})");
	},

	"data-wgo-marklastmove": function(value) {
		if(value.toLowerCase() == "false") this.markLastMove = false;
	},

	"data-wgo-diagram": function(value) {
		if(value) {
			if(value[0] == "(") this.sgf = value;
			else this.sgfFile = value;

			this.markLastMove = false;
			this.enableKeys = false;
			this.enableWheel = false;
			this.layout = {top: [], right: [], left: [], bottom: []};
		}
	}
}

var player_from_tag = function(elem) {
	var att, config, pl;
	
	config = {};

	for(var a = 0; a < elem.attributes.length; a++) {
		att = elem.attributes[a];
		if(BasicPlayer.attributes[att.name]) BasicPlayer.attributes[att.name].call(config, att.value, att.name);
	}

	pl = new BasicPlayer(elem, config);
	elem._wgo_player = pl;
}

WGo.BasicPlayer = BasicPlayer;

window.addEventListener("load", function() {
	var pl_elems = document.querySelectorAll("[data-wgo],[data-wgo-diagram]");

	for(var i = 0; i < pl_elems.length; i++) {
		player_from_tag(pl_elems[i]);
	}
});

})(WGo);
(function(WGo, undefined) {

"use strict";

/**
 * Base class for BasicPlayer's component. Each component should implement this interface.
 */

var Component = function() {
	this.element = document.createElement("div");
}

Component.prototype = {
	constructor: Component,
	
	/**
	 * Append component to element.
	 */
	
	appendTo: function(target) {
		target.appendChild(this.element);
	},
	
	/**
	 * Compute and return width of component.
	 */
	 
	getWidth: function() {
		var css = window.getComputedStyle(this.element);
		return parseInt(css.width);
	},
	
	/**
	 * Compute and return height of component.
	 */
	
	getHeight: function() {
		var css = window.getComputedStyle(this.element);
		return parseInt(css.height);
	},
	
	/**
	 * Update component. Actually dimensions are defined and cannot be changed in this method, 
	 * but you can change for example font size according to new dimensions.
	 */
	
	updateDimensions: function() {
	
	}
}

WGo.BasicPlayer.component.Component = Component;

})(WGo);
(function() {

"use strict";

var prepare_dom = function() {
	prepare_dom_box.call(this,"white");
	prepare_dom_box.call(this,"black");
	this.element.appendChild(this.white.box);
	this.element.appendChild(this.black.box);
}

var prepare_dom_box = function(type) {
	this[type] = {};
	var t = this[type];
	t.box = document.createElement("div");
	t.box.className = "wgo-box-wrapper wgo-player-wrapper wgo-"+type;

	t.name = document.createElement("div");
	t.name.className = "wgo-box-title";
	t.name.innerHTML = type;
	t.box.appendChild(t.name);
	
	var info_wrapper;
	info_wrapper = document.createElement("div");
	info_wrapper.className = "wgo-player-info";
	t.box.appendChild(info_wrapper);
	
	t.info = {};
	t.info.caps = prepare_dom_info("Capturas");
	t.info.caps.val.innerHTML = "0";
	info_wrapper.appendChild(t.info.caps.wrapper);
}

var prepare_dom_info = function(type) {
	var res = {};
	res.wrapper = document.createElement("div");
	res.wrapper.className = "wgo-player-info-box-wrapper";
	
	res.box = document.createElement("div");
	res.box.className = "wgo-player-info-box";
	res.wrapper.appendChild(res.box);
	
	res.title = document.createElement("div");
	res.title.className = "wgo-player-info-title";
	res.title.innerHTML = WGo.t(type);
	res.box.appendChild(res.title);
	
	res.val = document.createElement("div");
	res.val.className = "wgo-player-info-value";
	res.box.appendChild(res.val);
	
	return res;
}

var kifu_loaded = function(e) {
	var info = e.kifu.info || {};
	
	if(info.black) {
		this.black.name.innerHTML = WGo.filterHTML(info.black.name) || WGo.t("black");
	}
	else {
		this.black.name.innerHTML = WGo.t("black");
	}
	if(info.white) {
		this.white.name.innerHTML = WGo.filterHTML(info.white.name) || WGo.t("white");
	}
	else {
		this.white.name.innerHTML = WGo.t("white");
	}
	
	this.black.info.caps.val.innerHTML = "0";
	this.white.info.caps.val.innerHTML = "0";
	
	this.updateDimensions();
}

var modify_font_size = function(elem) {
	var css, max, size;
	
	if(elem.style.fontSize) {
		var size = parseInt(elem.style.fontSize);
		elem.style.fontSize = "";
		css = window.getComputedStyle(elem);
		max = parseInt(css.fontSize);
		elem.style.fontSize = size+"px";
	}
	else {	
		css = window.getComputedStyle(elem);
		max = size = parseInt(css.fontSize);
	}
	
	if(size == max && elem.scrollHeight <= elem.offsetHeight) return;
	else if(elem.scrollHeight > elem.offsetHeight) {
		size -= 2;
		while(elem.scrollHeight > elem.offsetHeight && size > 1) {
			elem.style.fontSize = size+"px";
			size -= 2;
		}
	}
	else if(size < max) {
		size += 2;
		while(elem.scrollHeight <= elem.offsetHeight && size <= max) {
			elem.style.fontSize = size+"px";
			size += 2;
		}
		if(elem.scrollHeight > elem.offsetHeight) {
			elem.style.fontSize = (size-4)+"px";
		}
	}
}

var update = function(e) {
	if(e.position.capCount.black !== undefined) this.black.info.caps.val.innerHTML = e.position.capCount.black;
	if(e.position.capCount.white !== undefined) this.white.info.caps.val.innerHTML = e.position.capCount.white;
}

/**
 * Implements box with basic informations about go players.
 */

var InfoBox = WGo.extendClass(WGo.BasicPlayer.component.Component, function(player) {
	this.super(player);
	this.element.className = "wgo-infobox";
	
	prepare_dom.call(this);

	player.addEventListener("kifuLoaded", kifu_loaded.bind(this));
	player.addEventListener("update", update.bind(this));

});

InfoBox.prototype.updateDimensions = function() {
	modify_font_size(this.black.name);
	modify_font_size(this.white.name);
};

var bp_layouts = WGo.BasicPlayer.layouts;
bp_layouts["right_top"].right.push("InfoBox");
bp_layouts["right"].right.push("InfoBox");
bp_layouts["one_column"].top.push("InfoBox");
bp_layouts["no_comment"].top.push("InfoBox");

WGo.i18n.en["rank"] = "Rank";
WGo.i18n.en["caps"] = "Caps";
WGo.i18n.en["time"] = "Time";

WGo.BasicPlayer.component.InfoBox = InfoBox;

})(WGo);
(function(WGo, undefined){

"use strict";

var prepare_dom = function() {
	this.box = document.createElement("div");
	this.box.className = "wgo-box-wrapper wgo-comments-wrapper";
	this.element.appendChild(this.box);
	
	this.comments_title = document.createElement("div");
	this.comments_title.className = "wgo-box-title";
	this.comments_title.innerHTML = WGo.t("comments");
	this.box.appendChild(this.comments_title);
	
	this.comments = document.createElement("div");
	this.comments.className = "wgo-comments-content";
	this.box.appendChild(this.comments);
	
	this.help = document.createElement("div");
	this.help.className = "wgo-help";
	this.help.style.display = "none";
	this.comments.appendChild(this.help);
	
	this.notification = document.createElement("div");
	this.notification.className = "wgo-notification";
	this.notification.style.display = "none";
	this.comments.appendChild(this.notification);
	
	this.comment_text = document.createElement("div");
	this.comment_text.className = "wgo-comment-text"; 
	this.comments.appendChild(this.comment_text);
}

var mark = function(move) {
	var x,y;
	
	x = move.charCodeAt(0)-'a'.charCodeAt(0);
	if(x < 0) x += 'a'.charCodeAt(0)-'A'.charCodeAt(0);
	if(x > 7) x--;
	y = (move.charCodeAt(1)-'0'.charCodeAt(0));
	if(move.length > 2) y = y*10+(move.charCodeAt(2)-'0'.charCodeAt(0));
	y = this.kifuReader.game.size-y;

	this._tmp_mark = {type:'MA', x:x, y:y};
	this.board.addObject(this._tmp_mark);
}

var unmark = function() {
	this.board.removeObject(this._tmp_mark);
	delete this._tmp_mark;
}

var search_nodes = function(nodes, player) {
	for(var i in nodes) {
		if(nodes[i].className && nodes[i].className == "wgo-move-link") {
			nodes[i].addEventListener("mouseover", mark.bind(player, nodes[i].innerHTML));
			nodes[i].addEventListener("mouseout", unmark.bind(player));
		}
		else if(nodes[i].childNodes && nodes[i].childNodes.length) search_nodes(nodes[i].childNodes, player);
	}
}	

var format_info = function(info, title) {
	var ret = '<div class="wgo-info-list">';
	if(title) ret += '<div class="wgo-info-title">'+WGo.t("gameinfo")+'</div>';
	for(var key in info) {
		ret += '<div class="wgo-info-item"><span class="wgo-info-label">'+key+'</span><span class="wgo-info-value">'+info[key]+'</span></div>';
	}
	ret += '</div>';
	return ret;
}

/**
 * Implements box for comments and game informations.
 */

var CommentBox = WGo.extendClass(WGo.BasicPlayer.component.Component, function(player) {
	this.super(player);
	this.player = player;
	
	this.element.className = "wgo-commentbox";
	
	prepare_dom.call(this);
	
	player.addEventListener("kifuLoaded", function(e) {
		if(e.kifu.hasComments()) {
			this.comments_title.innerHTML = WGo.t("comments");
			this.element.className = "wgo-commentbox";
			
			this._update = function(e) {
				this.setComments(e);
			}.bind(this);
			
			player.addEventListener("update", this._update);
		}
		else {
			this.comments_title.innerHTML = WGo.t("gameinfo");
			this.element.className = "wgo-commentbox wgo-gameinfo";
			
			if(this._update) {
				player.removeEventListener("update", this._update);
				delete this._update;
			}
			this.comment_text.innerHTML = format_info(e.target.getGameInfo());
		}
	}.bind(this));
	
	player.notification = function(text) {
		if(text) {
			this.notification.style.display = "block";
			this.notification.innerHTML = text;
			this.is_notification = true;
		}
		else {
			this.notification.style.display = "none";
			this.is_notification = false;
		}
		
		if(this.is_notification || this.is_help) this.comment_text.style.display = "none";
		else this.comment_text.style.display = "block";
		
	}.bind(this);
	
	player.help = function(text) {
		if(text) {
			this.help.style.display = "block";
			this.help.innerHTML = text;
			this.is_help = true;
		}
		else {
			this.help.style.display = "none";
			this.is_help = false;
		}
		
		if(this.is_notification || this.is_help) this.comment_text.style.display = "none";
		else this.comment_text.style.display = "block";
	}.bind(this);
});

CommentBox.prototype.setComments = function(e) {
	if(this.player._tmp_mark) unmark.call(this.player);

	var msg = "";
	if(!e.node.parent) {
		msg = format_info(e.target.getGameInfo(), true);
	}
	
	this.comment_text.innerHTML = msg+this.getCommentText(e.node.comment, this.player.config.formatNicks, this.player.config.formatMoves);

	if(this.player.config.formatMoves) {
		if(this.comment_text.childNodes && this.comment_text.childNodes.length) search_nodes(this.comment_text.childNodes, this.player);
	}
};

CommentBox.prototype.getCommentText = function(comment, formatNicks, formatMoves) {
	// to avoid XSS we must transform < and > to entities, it is highly recomanded not to change it
	//.replace(/</g,"&lt;").replace(/>/g,"&gt;") : "";
	if(comment) {
		var comm =  "<p>"+WGo.filterHTML(comment).replace(/\n/g, "</p><p>")+"</p>";
		if(formatNicks) comm = comm.replace(/(<p>)([^:]{3,}:)\s/g, '<p><span class="wgo-comments-nick">$2</span> ');
		if(formatMoves) comm = comm.replace(/\b[a-zA-Z]1?\d\b/g, '<a href="javascript:void(0)" class="wgo-move-link">$&</a>');
		return comm;
	}
	return "";
};

/**
 * Adding 2 configuration to BasicPlayer:
 *
 * - formatNicks: tries to highlight nicknames in comments (default: true)
 * - formatMoves: tries to highlight coordinates in comments (default: true)
 */
 
WGo.BasicPlayer.default.formatNicks = true;
WGo.BasicPlayer.default.formatMoves = true;

WGo.BasicPlayer.attributes["data-wgo-formatnicks"] = function(value) {
	if(value.toLowerCase() == "false") this.formatNicks = false;
}
	
WGo.BasicPlayer.attributes["data-wgo-formatmoves"] = function(value) {
	if(value.toLowerCase() == "false") this.formatMoves = false;
}

WGo.BasicPlayer.layouts["right_top"].right.push("CommentBox");
WGo.BasicPlayer.layouts["right"].right.push("CommentBox");
WGo.BasicPlayer.layouts["one_column"].bottom.push("CommentBox");

WGo.i18n.en["comments"] = "Comments";
WGo.i18n.en["gameinfo"] = "Game info";

WGo.BasicPlayer.component.CommentBox = CommentBox

})(WGo);
(function(WGo, undefined) {

"use strict";

var compare_widgets = function(a,b) {
	if(a.weight < b.weight) return -1;
	else if(a.weight > b.weight) return 1;
	else return 0;
}

var prepare_dom = function(player) {

	this.iconBar = document.createElement("div");
	this.iconBar.className = "wgo-control-wrapper";
	this.element.appendChild(this.iconBar);

	var widget;
	
	for(var w in Control.widgets) {
		widget = new Control.widgets[w].constructor(player, Control.widgets[w].args);
		widget.appendTo(this.iconBar);
		this.widgets.push(widget);
	}
}

var Control = WGo.extendClass(WGo.BasicPlayer.component.Component, function(player) {
	this.super(player);
	
	this.widgets = [];
	this.element.className = "wgo-player-control";

	prepare_dom.call(this, player);
});

Control.prototype.updateDimensions = function() {
	if(this.element.clientWidth < 340) this.element.className = "wgo-player-control wgo-340";
	else if(this.element.clientWidth < 440) this.element.className = "wgo-player-control wgo-440";
	else this.element.className = "wgo-player-control";
}

var control = WGo.BasicPlayer.control = {};

var butupd_first = function(e) {
	if(!e.node.parent && !this.disabled) this.disable();
	else if(e.node.parent && this.disabled) this.enable();
}

var butupd_last = function(e) {
	if(!e.node.children.length && !this.disabled) this.disable();
	else if(e.node.children.length && this.disabled) this.enable();
}

var but_frozen = function(e) {
	this._disabled = this.disabled;
	if(!this.disabled) this.disable();
}

var but_unfrozen = function(e) {
	if(!this._disabled) this.enable();
	delete this._disabled;
}

/**
 * Control.Widget base class. It is used for implementing buttons and other widgets.
 * First parameter is BasicPlayer object, second can be configuratioon object. 
 *
 * args = {
 *   name: String, // required - it is used for class name
 *	 init: Function, // other initialization code can be here
 *	 disabled: BOOLEAN, // default false
 * }
 */
 
control.Widget = function(player, args) {
	this.element = this.element || document.createElement(args.type || "div");
	this.element.className = "wgo-widget-"+args.name;
	this.init(player, args);
}

control.Widget.prototype = {
	constructor: control.Widget,
	
	/**
	 * Initialization function.
	 */
	
	init: function(player, args) {
		if(!args) return;
		if(args.disabled) this.disable();
		if(args.init) args.init.call(this, player);
	},
	
	/**
	 * Append to element.
 	 */
	 
	appendTo: function(target) {
		target.appendChild(this.element);
	},
	
	/**
	 * Make button disabled - eventual click listener mustn't be working.
 	 */
	
	disable: function() {
		this.disabled = true;
		if(this.element.className.search("wgo-disabled") == -1) {
			this.element.className += " wgo-disabled";
		}
	},
	
	/**
	 * Make button working
 	 */
	
	enable: function() {
		this.disabled = false;
		this.element.className = this.element.className.replace(" wgo-disabled","");
		this.element.disabled = "";
	},
	
}

/**
 * Group of widgets
 */

control.Group = WGo.extendClass(control.Widget, function(player, args) {
	this.element = document.createElement("div");
	this.element.className = "wgo-ctrlgroup wgo-ctrlgroup-"+args.name;
	
	var widget;
	for(var w in args.widgets) {
		widget = new args.widgets[w].constructor(player, args.widgets[w].args);
		widget.appendTo(this.element);
	}
});

/**
 * Clickable widget - for example button. It has click action. 
 *
 * args = {
 *   title: String, // required
 *	 init: Function, // other initialization code can be here
 *	 click: Function, // required *** onclick event
 *   togglable: BOOLEAN, // default false
 *	 selected: BOOLEAN, // default false
 *	 disabled: BOOLEAN, // default false
 *	 multiple: BOOLEAN
 * }
*/

control.Clickable = WGo.extendClass(control.Widget, function(player, args) {
	this.super(player, args);
});

control.Clickable.prototype.init = function(player, args) {
	var fn, _this = this;
	
	if(args.togglable) {
		fn = function() {
			if(_this.disabled) return;
			
			if(args.click.call(_this, player)) _this.select();
			else _this.unselect();
		};
	}
	else {
		fn = function() {
			if(_this.disabled) return;
			args.click.call(_this, player);
		};		
	}
	
	this.element.addEventListener("click", fn);
	this.element.addEventListener("touchstart", function(e){
		e.preventDefault();
		fn();
		if(args.multiple) {
			_this._touch_i = 0;
			_this._touch_int = window.setInterval(function(){
				if(_this._touch_i > 500) {
					fn();
				}
				_this._touch_i += 100;
			}, 100);
		}
		return false;
	});
	
	if(args.multiple) {
		this.element.addEventListener("touchend", function(e){
			window.clearInterval(_this._touch_int);
		});
	}

	if(args.disabled) this.disable();
	if(args.init) args.init.call(this, player);
};

control.Clickable.prototype.select = function() {
	this.selected = true;
	if(this.element.className.search("wgo-selected") == -1) this.element.className += " wgo-selected";
};

control.Clickable.prototype.unselect = function() {
	this.selected = false;
	this.element.className = this.element.className.replace(" wgo-selected","");
};

/**
 * Widget of button with image icon. 
 */

control.Button = WGo.extendClass(control.Clickable, function(player, args) {
	var elem = this.element = document.createElement("button");
	elem.className = "wgo-button wgo-button-"+args.name;
	elem.title = WGo.t(args.name);
	
	this.init(player, args);
});

control.Button.prototype.disable = function() {
	control.Button.prototype.super.prototype.disable.call(this);
	this.element.disabled = "disabled";
}
	
control.Button.prototype.enable = function() {
	control.Button.prototype.super.prototype.enable.call(this);
	this.element.disabled = "";
}

/**
 * Widget used in menu
 */

control.MenuItem = WGo.extendClass(control.Clickable, function(player, args) {
	var elem = this.element = document.createElement("div");
	elem.className = "wgo-menu-item wgo-menu-item-"+args.name;
	elem.title = WGo.t(args.name);
	elem.innerHTML = elem.title;
	
	this.init(player, args);
});

/**
 * Widget for move counter.
 */

control.MoveNumber = WGo.extendClass(control.Widget, function(player) {
	this.element = document.createElement("form");
	this.element.className = "wgo-player-mn-wrapper";
	
	var move = this.move = document.createElement("input");
	move.type = "text";
	move.value = "0";
	move.maxlength = 3;
	move.className = "wgo-player-mn-value";
	//move.disabled = "disabled";
	this.element.appendChild(move);

	this.element.onsubmit = move.onchange = function(player) {
		player.goTo(this.getValue());
		return false; 
	}.bind(this, player);
	
	player.addEventListener("update", function(e) {
		this.setValue(e.path.m);
	}.bind(this));
	
	player.addEventListener("kifuLoaded", this.enable.bind(this));
	player.addEventListener("frozen", this.disable.bind(this));
	player.addEventListener("unfrozen", this.enable.bind(this));
});

control.MoveNumber.prototype.disable = function() {
	control.MoveNumber.prototype.super.prototype.disable.call(this);
	this.move.disabled = "disabled";
};

control.MoveNumber.prototype.enable = function() {
	control.MoveNumber.prototype.super.prototype.enable.call(this);
	this.move.disabled = "";
};

control.MoveNumber.prototype.setValue = function(n) {
	this.move.value = n;
};

control.MoveNumber.prototype.getValue = function() {
	return parseInt(this.move.value);
};

// display menu
var player_menu = function(player) {

	if(player._menu_tmp) {
		delete player._menu_tmp;
		return;
	}
	if(!player.menu) {
		player.menu = document.createElement("div");
		player.menu.className = "wgo-player-menu";
		player.menu.style.position = "absolute";
		player.menu.style.display = "none";
		
		this.element.parentElement.appendChild(player.menu);
		
		var widget;
		for(var i in Control.menu) {
			widget = new Control.menu[i].constructor(player, Control.menu[i].args, true);
			widget.appendTo(player.menu);
		}
	}

	if(player.menu.style.display != "none") {
		player.menu.style.display = "none";

		document.removeEventListener("click", player._menu_ev);
		//document.removeEventListener("touchstart", player._menu_ev);
		delete player._menu_ev;
		
		this.unselect();
		return false;
	}
	else {
		player.menu.style.display = "block";
		
		var top = this.element.offsetTop;
		var left = this.element.offsetLeft;
		
		// kinda dirty syntax, but working well
		if(this.element.parentElement.parentElement.parentElement.parentElement == player.regions.bottom.wrapper) {
			player.menu.style.left = left+"px";
			player.menu.style.top = (top-player.menu.offsetHeight+1)+"px";
		}
		else {
			player.menu.style.left = left+"px";
			player.menu.style.top = (top+this.element.offsetHeight)+"px";
		}
			
		player._menu_ev = player_menu.bind(this, player)
		player._menu_tmp = true;
		
		document.addEventListener("click", player._menu_ev);
		//document.addEventListener("touchstart", player._menu_ev);

		return true;
	}
}

/**
 * List of widgets (probably MenuItem objects) to be displayed in drop-down menu.
 */
 
Control.menu = [{
	constructor: control.MenuItem,
	args: {
		name: "switch-coo",
		togglable: true,
		click: function(player) {
			player.setCoordinates(!player.coordinates);
			return player.coordinates;
		},
		init: function(player) {
			if(player.coordinates) this.select();
		}
	}
}];

/**
 * List of widgets (probably Button objects) to be displayed.
 *
 * widget = {
 *	 constructor: Function, // construct a instance of widget
 *	 args: Object,
 * }
*/

Control.widgets = [{
	constructor: control.Group,
	args: {
		name: "control",
		widgets: [{
			constructor: control.Button,
			args: {
				name: "first",
				disabled: true,
				init: function(player) {
					player.addEventListener("update", butupd_first.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) { 
					player.first();
				},
			}
		}, {
			constructor: control.Button,
			args: {
				name: "multiprev",
				disabled: true,
				multiple: true,
				init: function(player) {
					player.addEventListener("update", butupd_first.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) { 
					var p = WGo.clone(player.kifuReader.path);
					p.m -= 10; 
					player.goTo(p);
				},
			}
		},{
			constructor: control.Button,
			args: {
				name: "previous",
				disabled: true,
				multiple: true,
				init: function(player) {
					player.addEventListener("update", butupd_first.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) { 
					player.previous();
				},
			}
		}, {
			constructor: control.MoveNumber,
		}, {
			constructor: control.Button,
			args: {
				name: "next",
				disabled: true,
				multiple: true,
				init: function(player) {
					player.addEventListener("update", butupd_last.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) {
					player.next();
				},
			}
		}, {
			constructor: control.Button,
			args: {
				name: "multinext",
				disabled: true,
				multiple: true,
				init: function(player) {
					player.addEventListener("update", butupd_last.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) { 
					var p = WGo.clone(player.kifuReader.path);
					p.m += 10; 
					player.goTo(p);
				},
			}
		}, {
			constructor: control.Button,
			args: {
				name: "last",
				disabled: true,
				init: function(player) {
					player.addEventListener("update", butupd_last.bind(this));
					player.addEventListener("frozen", but_frozen.bind(this));
					player.addEventListener("unfrozen", but_unfrozen.bind(this));
				},
				click: function(player) {
					player.last()
				},
			}
		}]
	}
}];

var bp_layouts = WGo.BasicPlayer.layouts;
bp_layouts["right_top"].top.push("Control");
bp_layouts["right"].right.push("Control");
bp_layouts["one_column"].top.push("Control");
bp_layouts["no_comment"].bottom.push("Control");
bp_layouts["minimal"].bottom.push("Control");

var player_terms = {
	"about": "About",
	"first": "First",
	"multiprev": "10 moves back",
	"previous": "Previous",
	"next": "Next",
	"multinext": "10 moves forward",
	"last": "Last",
	"switch-coo": "Display coordinates",
	"menu": "Menu",
};

for(var key in player_terms) WGo.i18n.en[key] = player_terms[key];

WGo.BasicPlayer.component.Control = Control;

})(WGo);
(function(WGo) {

// board mousemove callback for edit move - adds highlighting
var edit_board_mouse_move = function(x,y) {
	if(this.player.frozen || (this._lastX == x && this._lastY == y)) return;
	
	this._lastX = x;
	this._lastY = y;
	
	if(this._last_mark) {
		this.board.removeObject(this._last_mark);
	}
	
	if(x != -1 && y != -1 && this.player.kifuReader.game.isValid(x,y)) {
		this._last_mark = {
			type: "outline",
			x: x,
			y: y, 
			c: this.player.kifuReader.game.turn
		};
		this.board.addObject(this._last_mark);
	}
	else {
		delete this._last_mark;
	}
}

// board mouseout callback for edit move	
var edit_board_mouse_out = function() {
	if(this._last_mark) {
		this.board.removeObject(this._last_mark);
		delete this._last_mark;
		delete this._lastX;
		delete this._lastY;
	}
}

// get differences of two positions as a change object (TODO create a better solution, without need of this function)
var pos_diff = function(old_p, new_p) {
	var size = old_p.size, add = [], remove = [];
	
	for(var i = 0; i < size*size; i++) {
		if(old_p.schema[i] && !new_p.schema[i]) remove.push({x:Math.floor(i/size),y:i%size});
		else if(old_p.schema[i] != new_p.schema[i]) add.push({x:Math.floor(i/size),y:i%size,c:new_p.schema[i]});
	}
	
	return {
		add: add,
		remove: remove
	}
}

WGo.Player.Editable = {};

/**
 * Toggle edit mode.
 */
	
WGo.Player.Editable = function(player, board) {
	this.player = player;
	this.board = board;
	this.editMode = false;
}

WGo.Player.Editable.prototype.set = function(set) {
	if(!this.editMode && set) {
		// save original kifu reader
		this.originalReader = this.player.kifuReader;
		
		// create new reader with cloned kifu
		this.player.kifuReader = new WGo.KifuReader(this.player.kifu.clone(), this.originalReader.rememberPath, this.originalReader.allow_illegal, this.originalReader.allow_illegal);
		
		// go to current position
		this.player.kifuReader.goTo(this.originalReader.path);
		
		// register edit listeners
		this._ev_click = this._ev_click || this.play.bind(this);
		this._ev_move = this._ev_move || edit_board_mouse_move.bind(this);
		this._ev_out = this._ev_out || edit_board_mouse_out.bind(this);
		
		this.board.addEventListener("click", this._ev_click);
		this.board.addEventListener("mousemove", this._ev_move);
		this.board.addEventListener("mouseout", this._ev_out);
		
		this.editMode = true;
	}
	else if(this.editMode && !set) {
		// go to the last original position
		this.originalReader.goTo(this.player.kifuReader.path);
		
		// change object isn't actual - update it, not elegant solution, but simple
		this.originalReader.change = pos_diff(this.player.kifuReader.getPosition(), this.originalReader.getPosition());
		
		// update kifu reader
		this.player.kifuReader = this.originalReader;
		this.player.update(true);
		
		// remove edit listeners
		this.board.removeEventListener("click", this._ev_click);
		this.board.removeEventListener("mousemove", this._ev_move);
		this.board.removeEventListener("mouseout", this._ev_out);
		
		this.editMode = false;
	}
}

WGo.Player.Editable.prototype.play = function(x,y) {
	if(this.player.frozen || !this.player.kifuReader.game.isValid(x, y)) return;
	
	this.player.kifuReader.node.appendChild(new WGo.KNode({
		move: {
			x: x, 
			y: y, 
			c: this.player.kifuReader.game.turn
		}, 
		edited: true
	}));
	this.player.next(this.player.kifuReader.node.children.length-1);
}

if(WGo.BasicPlayer && WGo.BasicPlayer.component.Control) {
	WGo.BasicPlayer.component.Control.menu.push({
		constructor: WGo.BasicPlayer.control.MenuItem,
		args: {
			name: "editmode",
			togglable: true,
			click: function(player) { 
				this._editable = this._editable || new WGo.Player.Editable(player, player.board);
				this._editable.set(!this._editable.editMode);
				return this._editable.editMode;
			},
			init: function(player) {
				var _this = this;
				player.addEventListener("frozen", function(e) {
					_this._disabled = _this.disabled;
					if(!_this.disabled) _this.disable();
				});
				player.addEventListener("unfrozen", function(e) {
					if(!_this._disabled) _this.enable();
					delete _this._disabled;
				});
			},
		}
	}); 
}

WGo.i18n.en["editmode"] = "Edit mode";

})(WGo);
(function(WGo){

var ScoreMode = function(position, board, komi, output) {
	this.originalPosition = position;
	this.position = position.clone();
	this.board = board;
	this.komi = komi;
	this.output = output;
}

var state = ScoreMode.state = {
	UNKNOWN: 0,
	BLACK_STONE: 1, // must be equal to WGo.B
	WHITE_STONE: -1, // must be equal to WGo.W
	BLACK_CANDIDATE: 2,
	WHITE_CANDIDATE: -2,
	BLACK_NEUTRAL: 3,
	WHITE_NEUTRAL: -3,
	NEUTRAL: 4,
}

var territory_set = function(pos, x, y, color, margin) {
	var p = pos.get(x, y);
	if(p === undefined || p == color || p == margin) return;
	
	pos.set(x, y, color);
	
	territory_set(pos, x-1, y, color, margin);
	territory_set(pos, x, y-1, color, margin);
	territory_set(pos, x+1, y, color, margin);
	territory_set(pos, x, y+1, color, margin);
}

var territory_reset = function(pos, orig, x, y, margin) {
	var o = orig.get(x, y);
	if(pos.get(x, y) == o) return;
	
	pos.set(x, y, o);
	territory_reset(pos, orig, x-1, y, margin);
	territory_reset(pos, orig, x, y-1, margin);
	territory_reset(pos, orig, x+1, y, margin);
	territory_reset(pos, orig, x, y+1, margin);
}

ScoreMode.prototype.start = function() {
	this.calculate();
	this.saved_state = this.board.getState();
	this.displayScore();
	
	this._click = (function(x,y) {
		var c = this.originalPosition.get(x,y);
		
		if(c == WGo.W) {
			if(this.position.get(x, y) == state.WHITE_STONE) territory_set(this.position, x, y, state.BLACK_CANDIDATE, state.BLACK_STONE);
			else {
				territory_reset(this.position, this.originalPosition, x, y, state.BLACK_STONE);
				this.calculate();
			}
		}
		else if(c == WGo.B) {
			if(this.position.get(x, y) == state.BLACK_STONE) territory_set(this.position, x, y, state.WHITE_CANDIDATE, state.WHITE_STONE);
			else {
				territory_reset(this.position, this.originalPosition, x, y, state.WHITE_STONE);
				this.calculate();
			}
		}
		else {
			var p = this.position.get(x, y);
			
			if(p == state.BLACK_CANDIDATE) this.position.set(x, y, state.BLACK_NEUTRAL);
			else if(p == state.WHITE_CANDIDATE) this.position.set(x, y, state.WHITE_NEUTRAL);
			else if(p == state.BLACK_NEUTRAL) this.position.set(x, y, state.BLACK_CANDIDATE);
			else if(p == state.WHITE_NEUTRAL) this.position.set(x, y, state.WHITE_CANDIDATE);
		}
		
		this.board.restoreState({objects: WGo.clone(this.saved_state.objects)});
		this.displayScore();
	}).bind(this);
	
	this.board.addEventListener("click", this._click);
}

ScoreMode.prototype.end = function() {
	this.board.restoreState({objects: WGo.clone(this.saved_state.objects)});
	this.board.removeEventListener("click", this._click);
}

ScoreMode.prototype.displayScore = function() {
	var score = {
		black: [],
		white: [],
		neutral: [],
		black_captured: [],
		white_captured: [],
	}
	
	for(var i = 0; i < this.position.size; i++) {
		for(var j = 0; j < this.position.size; j++) {
			s = this.position.get(i,j);
			t = this.originalPosition.get(i,j);
			
			if(s == state.BLACK_CANDIDATE) score.black.push({x: i, y: j, type: "mini", c: WGo.B});
			else if(s == state.WHITE_CANDIDATE) score.white.push({x: i, y: j, type: "mini", c: WGo.W});
			else if(s == state.NEUTRAL) score.neutral.push({x: i, y: j});
			
			if(t == WGo.W && s != state.WHITE_STONE) score.white_captured.push({x: i, y: j, type: "outline", c: WGo.W});
			else if(t == WGo.B && s != state.BLACK_STONE) score.black_captured.push({x: i, y: j, type: "outline", c: WGo.B});
		}
	}
	
	for(var i = 0; i < score.black_captured.length; i++) {
		this.board.removeObjectsAt(score.black_captured[i].x, score.black_captured[i].y);
	}
	
	for(var i = 0; i < score.white_captured.length; i++) {
		this.board.removeObjectsAt(score.white_captured[i].x, score.white_captured[i].y);
	}
	
	this.board.addObject(score.white_captured);
	this.board.addObject(score.black_captured);
	this.board.addObject(score.black);
	this.board.addObject(score.white);
	
	var msg = "<p style='font-weight: bold;'>"+WGo.t("RE")+"</p>";
	
	var sb = score.black.length+score.white_captured.length+this.originalPosition.capCount.black;
	var sw = score.white.length+score.black_captured.length+this.originalPosition.capCount.white+parseFloat(this.komi);
	
	msg += "<p>"+WGo.t("black")+": "+score.black.length+" + "+(score.white_captured.length+this.originalPosition.capCount.black)+" = "+sb+"</br>";
	msg += WGo.t("white")+": "+score.white.length+" + "+(score.black_captured.length+this.originalPosition.capCount.white)+" + "+this.komi+" = "+sw+"</p>";
	
	if(sb > sw) msg += "<p style='font-weight: bold;'>"+WGo.t("bwin", sb-sw)+"</p>";
	else msg += "<p style='font-weight: bold;'>"+WGo.t("wwin", sw-sb)+"</p>";
	
	this.output(msg);
}

ScoreMode.prototype.calculate = function() {
	var p, s, t, b, w, change;
	
	// 1. create testing position, empty fields has flag ScoreMode.UNKNOWN
	p = this.position;
	
	// 2. repeat until there is some change of state:
	change = true;
	while(change) {
		change = false;
		
		// go through the whole position
		for(var i = 0; i < p.size; i++) {
			//var str = "";
			for(var j = 0; j < p.size; j++) {
				s = p.get(j,i);
				
				if(s == state.UNKNOWN || s == state.BLACK_CANDIDATE || s == state.WHITE_CANDIDATE) {
					// get new state
					t = [p.get(j-1, i), p.get(j, i-1), p.get(j+1, i), p.get(j, i+1)];
					b = false;
					w = false;

					for(var k = 0; k < 4; k++) {
						if(t[k] == state.BLACK_STONE || t[k] == state.BLACK_CANDIDATE) b = true;
						else if(t[k] == state.WHITE_STONE || t[k] == state.WHITE_CANDIDATE) w = true;
						else if(t[k] == state.NEUTRAL) {
							b = true;
							w = true;
						}
					}
					
					t = false;
					
					if(b && w) t = state.NEUTRAL;
					else if(b) t = state.BLACK_CANDIDATE;
					else if(w) t = state.WHITE_CANDIDATE;
					
					if(t && s != t) {
						change = true;
						p.set(j, i, t);
					}
				}
				//str += (p.get(j,i)+5)+" ";
			}
			//console.log(str);
		}
		//console.log("------------------------------------------------------------");
	}
}

WGo.ScoreMode = ScoreMode;

if(WGo.BasicPlayer && WGo.BasicPlayer.component.Control) {
	WGo.BasicPlayer.component.Control.menu.push({
		constructor: WGo.BasicPlayer.control.MenuItem,
		args: {
			name: "scoremode",
			togglable: true,
			click: function(player) { 
				if(this.selected) {
					player.setFrozen(false);
					this._score_mode.end();
					delete this._score_mode;
					player.notification();
					player.help();
					return false;
				}
				else {
					player.setFrozen(true);
					player.help("<p>"+WGo.t("help_score")+"</p>");
					this._score_mode = new WGo.ScoreMode(player.kifuReader.game.position, player.board, player.kifu.info.KM || 0.5, player.notification);
					this._score_mode.start();
					return true;
				}
			},
		}
	});
}

WGo.i18n.en["scoremode"] = "Count score";
WGo.i18n.en["score"] = "Score";
WGo.i18n.en["bwin"] = "Black wins by $ points.";
WGo.i18n.en["wwin"] = "White wins by $ points.";
WGo.i18n.en["help_score"] = "Click on stones to mark them dead or alive. You can also set and unset territory points by clicking on them. Territories must be completely bordered.";

})(WGo);
(function(WGo, undefined) {

"use strict";

var permalink = {
	active: true,
	query: {},
};

var handle_hash = function(player) {
	try {
		permalink.query = JSON.parse('{"'+window.location.hash.substr(1).replace('=', '":')+'}');
	}
	catch(e) {
		permalink.query = {};
	}
}

// add hashchange event
window.addEventListener("hashchange", function() {
	if(window.location.hash != "" && permalink.active) {
		handle_hash();

		for(var key in permalink.query) {
			var p_el = document.getElementById(key);
			if(p_el && p_el._wgo_player) p_el._wgo_player.goTo(move_from_hash);
		}
	}
});

// save hash query (after DOM is loaded - you can turn this off by setting WGo.Player.permalink.active = false;
window.addEventListener("DOMContentLoaded", function() {
	if(window.location.hash != "" && permalink.active) {
		handle_hash();
	}
});

// scroll into view of the board
window.addEventListener("load", function() {
	if(window.location.hash != "" && permalink.active) {
		for(var key in permalink.query) {
			var p_el = document.getElementById(key);
			if(p_el && p_el._wgo_player) {
				p_el.scrollIntoView();
				break;
			}
		}
	}
});

var move_from_hash = function() {
	if(permalink.query[this.element.id]) {
		return permalink.query[this.element.id].goto;
	}
}

WGo.Player.default.move = move_from_hash;

// add menu item
if(WGo.BasicPlayer && WGo.BasicPlayer.component.Control) {
	WGo.BasicPlayer.component.Control.menu.push({
		constructor: WGo.BasicPlayer.control.MenuItem,
		args: {
			name: "permalink",
			click: function(player) {
				var link = location.href.split("#")[0]+'#'+player.element.id+'={"goto":'+JSON.stringify(player.kifuReader.path)+'}';
				player.showMessage('<h1>'+WGo.t('permalink')+'</h1><p><input class="wgo-permalink" type="text" value=\''+link+'\' onclick="this.select(); event.stopPropagation()"/></p>');
			},
		}
	});
}

WGo.Player.permalink = permalink;
WGo.i18n.en["permalink"] = "Permanent link";

})(WGo);
(function (WGo) {
    'use strict';

    WGo.i18n.pl = {
        "about-text": "<h1>WGo.js Player 2.0</h1>"
                          + "<p>Wersja dostosowana do Interaktywnego Kursu Go</p>"
                          + "<p>Szczególy <a href='http://wgo.waltheri.net/player' target='_blank'>wgo.waltheri.net/player</a></p>"
            + "<p>Copyright &copy; 2013 Jan Prokop</p>",
        "black": "Pretas",
        "white": "Brancas",
        "DT": "Data",
        "KM": "Komi",
        "HA": "Handicap",
        "AN": "Adnotacje",
        "CP": "Prawa autorskie",
        "GC": "Komentarze",
        "GN": "Nazwa gry",
        "ON": "Fuseki",
        "OT": "Overtime",
        "TM": "Czas podstawowy",
        "RE": "Wynik",
        "RO": "Runda",
        "RU": "Zasady",
        "US": "Recorder",
        "PC": "Miejsce",
        "EV": "Wydarzenie",
        "SO": "Źródło",
        "none": "brak",
        "bpass": "Czarny spasował."
    };

    WGo.lang = 'pl';

}(WGo));













