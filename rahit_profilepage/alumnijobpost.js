document.addEventListener('DOMContentLoaded', () => {
    const jobPostForm = document.getElementById('jobPostForm');
    const jobList = document.getElementById('job-list');
    
    const mentorForm = document.getElementById('mentorForm');
    const mentorList = document.getElementById('mentor-list');

    // Handle job post submission
    jobPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const jobTitle = document.getElementById('job-title').value;
        const jobDescription = document.getElementById('job-description').value;
        const jobLocation = document.getElementById('job-location').value;
        
        const jobItem = document.createElement('li');
        jobItem.textContent = `${jobTitle} - ${jobLocation}: ${jobDescription}`;
        jobList.appendChild(jobItem);
        
        // Reset form
        jobPostForm.reset();
    });

    // Handle mentor form submission
    mentorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const mentorCheck = document.getElementById('event').checked ? 'Yes' : 'No';
        
        const mentorItem = document.createElement('li');
        mentorItem.textContent = `${name} - ${role} (Willing to mentor: ${mentorCheck})`;
        mentorList.appendChild(mentorItem);

        // Reset form
        mentorForm.reset();
    });
});
