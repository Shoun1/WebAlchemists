document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme);
        themeToggle.checked = savedTheme === 'dark-mode';
    }

    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Handle profile image change
    const profilePicture = document.getElementById('profile-picture');
    const uploadPicture = document.getElementById('upload-picture');

    profilePicture.addEventListener('click', () => uploadPicture.click());

    uploadPicture.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Handle experience list management
    const experienceList = document.getElementById('experience-list');
    const addExperienceButton = document.getElementById('add-experience');

    addExperienceButton.addEventListener('click', function () {
        const newExperience = document.createElement('li');
        newExperience.contentEditable = true;
        newExperience.textContent = 'New experience...';
        experienceList.appendChild(newExperience);
        newExperience.focus();
    });

    // Sample posts data (as before)
    const posts = [
        {
            id: 1,
            author: 'Jane Smith',
            time: '2h ago',
            content: 'This is a post content area where users can share updates.',
            likes: 0,
            likedByUser: false, // New property to track if the post is liked by the user
            comments: [],
        },
        {
            id: 2,
            author: 'John Doe',
            time: '4h ago',
            content: 'Another post with some interesting content.',
            likes: 0,
            likedByUser: false, // New property to track if the post is liked by the user
            comments: [],
        },
    ];

    // Render posts
    function renderPosts() {
        const contentSection = document.querySelector('.content');
        contentSection.innerHTML = '';

        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            postElement.innerHTML = `
                <div class="post-header">
                    <img src="https://via.placeholder.com/50" alt="User Picture">
                    <div>
                        <h3>${post.author}</h3>
                        <p>${post.time}</p>
                    </div>
                </div>
                <p>${post.content}</p>
                <textarea class="edit-input hidden" data-id="${post.id}">${post.content}</textarea>
                <div class="post-footer">
                    <div class="left-actions">
                        <button class="like-button" data-id="${post.id}">
                            Like (${post.likes})
                        </button>
                        <button class="comment-button" data-id="${post.id}">Comment</button>
                        <button class="share-button">Share</button>
                    </div>
                    <div class="right-actions">
                        <button class="edit-button" data-id="${post.id}">Edit</button>
                        <button class="delete-button" data-id="${post.id}">Delete</button>
                    </div>
                </div>
                <div class="comments-section">
                    <ul>
                        ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                    </ul>
                    <input type="text" class="comment-input" data-id="${post.id}" placeholder="Write a comment...">
                </div>
            `;

            contentSection.appendChild(postElement);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        const likeButtons = document.querySelectorAll('.like-button');
        const commentButtons = document.querySelectorAll('.comment-button');
        const commentInputs = document.querySelectorAll('.comment-input');
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        likeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const postId = parseInt(this.getAttribute('data-id'));
                const post = posts.find(p => p.id === postId);

                if (!post.likedByUser) {
                    post.likes += 1;
                    post.likedByUser = true;
                } else {
                    alert('You have already liked this post.');
                }

                renderPosts();
            });
        });

        commentButtons.forEach(button => {
            button.addEventListener('click', function () {
                const postId = parseInt(this.getAttribute('data-id'));
                const commentInput = document.querySelector(`.comment-input[data-id="${postId}"]`);
                if (commentInput.style.display === 'block') {
                    commentInput.style.display = 'none';
                } else {
                    commentInput.style.display = 'block';
                    commentInput.focus();
                }
            });
        });

        commentInputs.forEach(input => {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    const postId = parseInt(this.getAttribute('data-id'));
                    const post = posts.find(p => p.id === postId);
                    post.comments.push(this.value.trim());
                    this.value = '';
                    renderPosts();
                }
            });
        });

        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const postId = parseInt(this.getAttribute('data-id'));
                const post = posts.find(p => p.id === postId);
                const editInput = document.querySelector(`.edit-input[data-id="${postId}"]`);
                const postContent = editInput.previousElementSibling;

                if (editInput.classList.contains('hidden')) {
                    editInput.classList.remove('hidden');
                    postContent.style.display = 'none';
                } else {
                    post.content = editInput.value.trim();
                    renderPosts();
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const postId = parseInt(this.getAttribute('data-id'));
                const postIndex = posts.findIndex(p => p.id === postId);
                posts.splice(postIndex, 1);
                renderPosts();
            });
        });
    }

    renderPosts();
});
