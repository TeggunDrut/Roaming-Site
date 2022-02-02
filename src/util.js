class Vector2 {
  Vector2(x, y) {
    this.x = x;
    this.y = y;
  }
}
consoleLog = (text) => {

  let text2 = document.createElement('p');
  text2.innerHTML = text;
  document.body.appendChild(text2);

}