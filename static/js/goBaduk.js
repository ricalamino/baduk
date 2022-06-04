(function(global) {
  'use strict';

  var CORRECT_ANSWER = "[OK]",

      CLASSES = {
          BOARD: 'board',
          STATUS: 'status',
          IN_PROGRESS: 'in-progress',
          SUCCESS: 'success',
          FAIL: 'fail'
      },

      STRINGS = {
          CORRECT:         'Correct! ',
          FAIL:            'Wrong. ',
          YOUR_TURN:       'Your turn.',
          BLACK_TURN:      'Black turn.',
          WHITE_TURN:      'White turn.',
          WHITE_PLAYS:     'White plays...',
          ILLEGAL_KO:      'Illegal play - KO.',
          ILLEGAL_SUICIDE: 'Illegal play - suicide.'
      },

      ERRORS = {
          OUT_OF_BOUNDS: 1,
          STONE:         2,
          SUICIDE:       3,
          KO:            4
      },

      OPAQUE_SHELL = {
          stone:  {
              draw: function (args, board) {
                  var previousAlpha = this.globalAlpha;
                  this.globalAlpha = 0.4;
                  WGo.Board.drawHandlers.SHELL.stone.draw.call(this, args, board);
                  this.globalAlpha = previousAlpha;
              }
          },
          shadow: WGo.Board.drawHandlers.SHELL.shadow
      },

      TIP_MARKER = {
          stone: {
              draw: function(args, board) {
                  var xr = board.getX(args.x),
                      yr = board.getY(args.y),
                      sr = board.stoneRadius;

                  this.strokeStyle = "#EF3C21"; //board.obj_arr[args.x][args.y][0].c == WGo.W ? "#356E9E" : "#57ADFD";
                  this.lineWidth = args.lineWidth || 3;
                  this.beginPath();
                  this.arc(xr-board.ls, yr-board.ls, sr/2, 0, 2*Math.PI, true);
                  this.stroke();
              }
          }
      },

      TIP_REGEXP = /([A-T][0-9]{1,2})/g,
      GOBAN_ALPHABET = 'ABCDEFGHJKLMNOPQRST';

  function addTips(element, player, string) {

      if (!string) {
          string = element.innerHTML;
      }

      element.innerHTML = string.replace(TIP_REGEXP, "<abbr>$1</abbr>");

      var tips = element.getElementsByTagName('abbr'),
          lastPos;

      function showTip(e) {
          var coords = e.target.innerHTML;

          hideTip();
          lastPos = {
              x: GOBAN_ALPHABET.indexOf(coords[0]),
              y: player.board.size - parseInt(coords.substr(1), 10),
              type: TIP_MARKER
          };
          player.board.addObject(lastPos);
      }

      function hideTip() {
          if (lastPos) {
              player.board.removeObject(lastPos);
              lastPos = null;
          }
      }

      if (tips) {
          Array.prototype.forEach.call(tips, function (tip) {
              tip.addEventListener('mouseenter', showTip);
              tip.addEventListener('mouseout', hideTip);
          })
      }

      return tips.length;
  }

  function addComments(element, player) {
      function updateComments(params) {
          if (params.node.comment) {
              addTips(element, player, params.node.comment);
          } else {
              element.innerHTML = '';
          }
      }

      player.addEventListener('update', updateComments);
      player.addEventListener('kifuloaded', updateComments);
  }

  function addHoverFunctionality(player) {
      var lastPos = null;

      function clearLastPos() {
          if (lastPos) {
              player.board.removeObject(lastPos);
              lastPos = null;
          }
      }

      player.board.addEventListener('mousemove', function (x, y) {
          if (player.config.noClick) {
              clearLastPos();
              return;
          }

          var game = player.kifuReader.game,
              object = {
                  x: x,
                  y: y,
                  c: game.turn,
                  type: OPAQUE_SHELL
              };

          if (game.position.get(x, y) == 0) { // no stone
              if (!lastPos || lastPos.x !== object.x || lastPos.y !== object.y || lastPos.c !== object.c) {
                  clearLastPos();
                  player.board.addObject(object);
                  lastPos = object;
              }
          } else {
              clearLastPos();
          }

      });

      player.board.addEventListener('click', clearLastPos);
      player.board.addEventListener('mouseout', clearLastPos);
  }

  /**
   * Functionality decorator and proxy for WGo Player handlers.
   * It binds references to some specific DOMElement objects and calls handler function with following params:
   * - board - Reference to wgo-player placeholder (not yet wgo-player instance)
   * - sgf
   * - api - set of functions:
   *  + progress(text) - adds in-progress class
   *  + success(text) - adds success class, removes others
   *  + failure(text) - adds failure class, remove others
   *  + reset(text) - removes all classes
   *  + status(text) - updates status text only
   *  + onClick(callback,scope) - button click callback
   *
   *
   * @param {DOMElement} element
   * @param {Function} handler
   */
  function decorateWgo(element, handler) {
      var board =       element.getElementsByClassName('board')[0],
          sgf =         element.getAttribute('data-sgf'),
          status =      element.getElementsByClassName('status')[0],
          description = element.getElementsByClassName('description')[0],
          statusText =  status.getElementsByTagName('p')[0],
          buttonBack =  status.getElementsByClassName('back')[0],
          buttonReset = status.getElementsByClassName('reset')[0];

      function setStatusText(text) {
          if (text) {
              statusText.innerHTML = text;
          }
      }

      function bindToButton(button, callback, scope) {
          button.addEventListener('click', function (e) {
              return callback.call(scope || this, e) === true; // automatic return false;
          });
      }

      handler(board, sgf, {
          progress: function (text) {
              status.classList.add(CLASSES.IN_PROGRESS);
              setStatusText(text);
          },
          success:  function (text) {
              status.classList.remove(CLASSES.FAIL);
              status.classList.remove(CLASSES.IN_PROGRESS);
              status.classList.add(CLASSES.SUCCESS);
              setStatusText(text);
          },

          failure: function (text) {
              status.classList.add(CLASSES.FAIL);
              status.classList.remove(CLASSES.IN_PROGRESS);
              status.classList.remove(CLASSES.SUCCESS);
              setStatusText(text);
          },

          reset: function (text) {
              status.classList.remove(CLASSES.FAIL);
              status.classList.remove(CLASSES.IN_PROGRESS);
              status.classList.remove(CLASSES.SUCCESS);
              setStatusText(text);
          },

          status: setStatusText,

          onReset: function (callback, scope) {
              bindToButton(buttonReset, callback, scope);
          },

          onBack: function (callback, scope) {
              bindToButton(buttonBack, callback, scope);
          }
      }, description);
  }

  function decorateDiagram(element) {
      var board = element.getElementsByClassName('board')[0],
          description = element.getElementsByClassName('description')[0],
          player = new WGo.BasicPlayer(board, {
              sgf: element.getAttribute('data-sgf'),
              markLastMove: true,
              enableKeys: false,
              enableWheel: false,
              autoRespond: false,
              showNotInKifu: false,
              noClick: true,
              layout: {top: [], right: [], left: [], bottom: []}
          });

      if (addTips(description, player) > 0) {
          player.setCoordinates(true);
      }

      player.last();
  }

  function decorateReview(element) {
      var board = element.getElementsByClassName('board')[0],
          description = element.getElementsByClassName('description')[0],
          comments = element.getElementsByClassName('comments')[0],
          player = new WGo.BasicPlayer(board, {
              sgf: element.getAttribute('data-sgf'),
              layout: {top: ["InfoBox"], right: [], left: [], bottom: ["Control"]}
          });

      player.setCoordinates(true);
      addTips(description, player);
      addComments(comments, player);
  }

  function decorateBlackPlay(board, sgf, api, description) {
      var counter = 0,
          player;

      player = new WGo.BasicPlayer(board, {
          sgf: sgf,
          markLastMove: false,
          enableKeys: false,
          enableWheel: false,
          autoRespond: false,
          autoPass: true,
          showNotInKifu: true,
          showVariations: false,
          responseDelay: 0,
          layout: {top: [], right: [], left: [], bottom: []}
      });

      function triggerSuccess(comment) {
          api.success(STRINGS.CORRECT + comment);
          player.config.noClick = true;
      }

      function triggerReset() {
          api.reset(STRINGS.YOUR_TURN);
          counter = 0;
          player.config.noClick = false;
      }

      /**
       * Event handler for responded event.
       * Checks if all white stones have been caught. If yes  - triggers success, otherwise - updates status text .
       * @param {Object} params
       */
      function updateStatus(params) {
          var whiteCount = params.position.schema.reduce(function (sum, el) { return sum + (el === WGo.W); }, 0);

          counter += 1;

          api.progress("Movimentos: " + counter + "<br>Pedras para capturar: " + whiteCount);

          if (whiteCount === 0) {
              triggerSuccess("Você conseguiu capturar todas as pedras brancas. Número de movimentos feitos: " + counter);
          }
      }

      player.addEventListener('responded', updateStatus);

      addHoverFunctionality(player);
      addTips(description, player);

      api.onReset(function () {
          player.reset();
          triggerReset();
      });
  }

  function decorateProblem(board, sgf, api, description) {
      var player;

      function triggerSuccess(comment) {
          api.success(STRINGS.CORRECT + comment);
          player.config.noClick = true;
      }

      function triggerFail(comment) {
          api.failure(STRINGS.FAIL + comment);
          player.config.noClick = true;
      }

      function triggerReset() {
          api.reset(STRINGS.YOUR_TURN);
          player.config.noClick = false;
      }

      /**
       * Event handler for notinkifu and nomoremoves events.
       * Analysis of params will allow to determine what outcome of the event should be.
       * @param {Object} params
       */
      function isProblemSolved(params) {
          // fail when the move is valid but was not found in kifu
          if (params.type === 'notinkifu') {
              triggerFail(params.node.comment || '');
              return;
          }

          // check if there're no more moves
          // this condition in fact is not necessary :)
          if (params.type === 'nomoremoves') {

              // solution is hidden inside the move's comment
              if (params.node.comment && ~params.node.comment.indexOf(CORRECT_ANSWER)) {
                  triggerSuccess(params.node.comment.replace(CORRECT_ANSWER, ''));
              } else {
                  triggerFail(params.node.comment || '');
              }
          }
      }

      function whiteToPlay() {
          api.status(STRINGS.WHITE_PLAYS);
      }

      function blackToPlay(params) {
          api.progress((params.node.comment ? params.node.comment + ' ' : '') + STRINGS.YOUR_TURN);
      }

      api.onReset(function () {
          player.reset();
          triggerReset();
      });

      player = new WGo.BasicPlayer(board, {
          problemSgf: sgf
      });

      player.addEventListener('played', whiteToPlay);
      player.addEventListener('responded', blackToPlay);
      player.addEventListener('nomoremoves', isProblemSolved);
      player.addEventListener('notinkifu', isProblemSolved);

      addHoverFunctionality(player);

      if (addTips(description, player) > 0) {
          player.setCoordinates(true);
      }

      triggerReset();
  }

  function decorateFreePlay(board, sgf, api, description) {
      var player = new WGo.BasicPlayer(board, {
          sgf: sgf,
          markLastMove: false,
          enableKeys: false,
          enableWheel: false,
          autoRespond: false,
          autoPass: false,
          showNotInKifu: true,
          showVariations: false,
          responseDelay: 0,
          layout: {top: [], right: [], left: [], bottom: []}
      });

      function whomToPlay(color) {
          return (color == WGo.B) ? STRINGS.BLACK_TURN : STRINGS.WHITE_TURN
      }

      function updateStatus(params) {
          api.progress(whomToPlay(params.target.kifuReader.game.turn));
      }

      /**
       * Handles illegal moves
       *
       * Error codes (params.error):
       * 1 - given coordinates are not on board
       * 2 - on given coordinates already is a stone
       * 3 - suicide (currently they are forbbiden)
       * 4 - repeated position
       *
       * @param {Object} params
       */
      function illegalMove(params) {
          var status;

          switch (params.error) {
              case ERRORS.KO:
                  status = STRINGS.ILLEGAL_KO;
                  break;
              case ERRORS.SUICIDE:
                  status = STRINGS.ILLEGAL_SUICIDE;
                  break;
          }

          if (status) {
              api.status(status + ' ' + whomToPlay(params.target.kifuReader.game.turn));
          }
      }

      player.addEventListener('played', updateStatus);
      player.addEventListener('illegal', illegalMove);
      player.setCoordinates(true);

      addHoverFunctionality(player);
      addTips(description, player);

      api.onReset(function () {
          player.reset();
          api.reset(STRINGS.BLACK_TURN);
      });

      api.onBack(function () {
          player.previous();

          var status = whomToPlay(player.kifuReader.game.turn);

          if (player.kifuReader.node === player.kifuReader.kifu.root) {
              api.reset(status);
          } else {
              api.status(status);
          }
      })
  }

  global.addEventListener('load', function () {
      var elements = document.getElementsByClassName('sgf');

      Array.prototype.slice.call(elements).forEach(function (element) {
          if (element.classList.contains('problem')) {
              decorateWgo(element, decorateProblem);
          } else if (element.classList.contains('diagram')) {
              decorateDiagram(element);
          } else if (element.classList.contains('blackplay')) {
              decorateWgo(element, decorateBlackPlay);
          } else if (element.classList.contains('freeplay')) {
              decorateWgo(element, decorateFreePlay);
          } else if (element.classList.contains('review')) {
              decorateReview(element);
          }
      });

      var selects = document.getElementsByClassName('lesson-selector');

      Array.prototype.slice.call(selects).forEach(function (el) {
         el.onchange = function (e) {
             var option = el.options[el.selectedIndex];

             if (!option.hasAttribute('selected')) {
                 document.location = document.location.origin + option.value;
             }
         }
      });
  });
}(window));
