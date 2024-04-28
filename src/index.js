document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');

    // Function to fetch dogs from the API and render them in the table
    const fetchAndRenderDogs = async () => {
        try {
            const reponse = await fetch('http://localhost:3000/dogs');
            const dogs = await Response.json();
            tableBody.innerHTML = '';
            dogs.forEach(dog => {
                const row =  document.createElement('tr');
                row.innerHTML = `
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.sex}</td>
                    <td><button class="edit-btn" data-id="${dog.id}"> Edit </button></td>
                `;
                tableBody.appendChild(row);

            });
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    fetchAnderRenderDogs();

})