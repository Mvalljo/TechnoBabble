const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('input[name="post-id"]').value;
  const comment_txt = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;
  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ post_id, comment_txt }),
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
