function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      showAvailableFiles(this.responseText);
    }
  };
  xhttp.open("GET", "http://localhost:3000/seeAvailableFiles", true);
  xhttp.send();
}

document.getElementById("sendText").onclick = () => {
  var password = document.getElementById("pString").innerText;
  var message = document.getElementById("textAreaInput").value;
  password += "_" + message;
  socket.send(password);
  emptyTextArea();
};

socket.onmessage = ({ data }) => {
  appendNewMessage(data);
};
