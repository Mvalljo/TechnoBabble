const commentFormHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;
   console.log(postId);
   console.log(body);
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId, body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to create comment');
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
