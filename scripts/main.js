console.log('sanity check!');

document.querySelector('.container').addEventListener("click", function(e) {
  e.target.classList.toggle('pink');
})
