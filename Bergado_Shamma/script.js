document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentsList = document.querySelector(".comments-list");

  function createCommentElement(name, comment) {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Name: " + name;

    const commentParagraph = document.createElement("p");
    commentParagraph.textContent = "Comment: " + comment;

    commentItem.appendChild(nameParagraph);
    commentItem.appendChild(commentParagraph);

    return commentItem;
  }

  function saveCommentToLocalStorage(name, comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name: name, comment: comment });
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function loadCommentsFromLocalStorage() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(function (comment) {
      const newComment = createCommentElement(comment.name, comment.comment);
      commentsList.appendChild(newComment);
    });
  }

  loadCommentsFromLocalStorage();

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !comment) {
      alert("Please enter both name and comment.");
      return;
    }

    const newComment = createCommentElement(name, comment);
    commentsList.appendChild(newComment);

    saveCommentToLocalStorage(name, comment);

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";

    newComment.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  commentForm.addEventListener("input", function () {
    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = !(name && comment);
  });
});
