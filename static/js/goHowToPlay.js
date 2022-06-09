var copyAddrBtn = document.querySelector('.copyAddrBtn');
var copyAddrBtnb = document.querySelector('.copyAddrBtnb');

copyAddrBtn.addEventListener('click', function(event) {
  copyTextToClipboard('3HrHVv1ZgoaSkaVJvj2aXsZDYkhJqe2TBA');
  document.getElementById('copied').style.display = 'block';
});
var copyAddrBtn = document.querySelector('.copyAddrBtn');

copyAddrBtnb.addEventListener('click', function(event) {
  copyTextToClipboard('3HrHVv1ZgoaSkaVJvj2aXsZDYkhJqe2TBA');
  document.getElementById('copiedb').style.display = 'block';
});

function copyTextToClipboard(text) {
 
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}