document.addEventListener('DOMContentLoaded', () => {
    const alumniData = [
        { name: 'John Doe', department: 'Computer Science', year: '2023' },
        { name: 'Jane Smith', department: 'Electrical Engineering', year: '2022' },
        { name: 'Alice Johnson', department: 'Mechanical Engineering', year: '2021' },
        { name: 'Robert Brown', department: 'Civil Engineering', year: '2020' },
        { name: 'Emily Davis', department: 'Computer Science', year: '2023' },
    ];

    const searchInput = document.getElementById('search-input');
    const departmentFilter = document.getElementById('department-filter');
    const yearFilter = document.getElementById('year-filter');
    const alumniList = document.getElementById('alumni-list');
    const resetBtn = document.getElementById('reset-btn');

    function displayAlumni(filteredData) {
        alumniList.innerHTML = '';
        filteredData.forEach(alumnus => {
            const li = document.createElement('li');
            li.textContent = `${alumnus.name} - ${alumnus.department}, Class of ${alumnus.year}`;
            alumniList.appendChild(li);
        });
    }

    // Display all alumni by default
    displayAlumni(alumniData);

    // Filter alumni based on search and filter criteria
    function filterAlumni() {
        const searchValue = searchInput.value.toLowerCase();
        const departmentValue = departmentFilter.value;
        const yearValue = yearFilter.value;

        const filteredData = alumniData.filter(alumnus => {
            const nameMatch = alumnus.name.toLowerCase().includes(searchValue);
            const departmentMatch = departmentValue === 'All' || alumnus.department === departmentValue;
            const yearMatch = yearValue === 'All' || alumnus.year === yearValue;
            return nameMatch && departmentMatch && yearMatch;
        });

        displayAlumni(filteredData);
    }

    // Event listeners for search and filter inputs
    searchInput.addEventListener('input', filterAlumni);
    departmentFilter.addEventListener('change', filterAlumni);
    yearFilter.addEventListener('change', filterAlumni);

    // Reset filters
    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        departmentFilter.value = 'All';
        yearFilter.value = 'All';
        displayAlumni(alumniData);
    });
});
