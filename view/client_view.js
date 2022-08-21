document.getElementById("pButton").onclick = () => {
  var password = document.getElementById("pInput").value;
  document.getElementById("pString").innerText = password;
  if (password != "") document.getElementById("textAreaInput").disabled = false;
};

document.getElementById("textAreaInput").disabled = true;

function emptyTextArea() {
  document.getElementById("textAreaInput").value = "";
}

function appendNewMessage(data) {
  var node = document.createElement("div");
  node.style.fontSize = "large";
  node.style.fontFamily = "Times New Roman";
  var style = getStyle();
  node.style.borderStyle = style.border;
  node.style.backgroundColor = style.color;
  var textnode = document.createTextNode(data);
  node.appendChild(textnode);
  document.getElementById("textReceived").appendChild(node);
}

function getStyle() {
  state *= -1;
  if (state == 1) {
    return {
      border: "solid",
      color: "white",
    };
  } else {
    return {
      border: "",
      color: "aqua",
    };
  }
}

function showAvailableFiles(responseText) {
  var show = JSON.parse(responseText);
  //console.log(show)
  var ol = document.createElement("ol");
  for (i = 0; i < show.length; i++) {
    let li = document.createElement("li");
    li.innerHTML =
      "<a href=" + "/fileUpload/" + show[i] + ">" + show[i] + "</a>";
    ol.appendChild(li);
  }
  document.getElementById("TARGET").innerHTML = "";
  document.getElementById("TARGET").appendChild(ol);
}
