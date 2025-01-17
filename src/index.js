document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');

    // Function to fetch dogs from the API and render them in the table
    const fetchAndRenderDogs = async () => {
        try {
            const response = await fetch('https://pseudo-data.onrender.com/dogs');
            const dogs = await response.json();
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

    fetchAndRenderDogs();

    // Event listener for the edit button 
    tableBody.addEventListener('click', async event => {
        if (event.target.classList.contains('edit-btn')) {
            const dogId = event.target.dataset.id;
            try{
                const response = await fetch(`https://pseudo-data.onrender.com/dogs/${dogId}`);
                const dog = await response.json();
                dogForm.name.value = dog.name;
                dogForm.breed.value = dog.breed;
                dogForm.sex.value = dog.sex;

                dogForm.dataset.id = dogId;
            } catch (error) {
                console.error('Error fetching dog for edit:', error);
            }
        }
    });

    // Event listener for form submission
    dogForm.addEventListener('submit', async event => {
        event.preventDefault();
        const dogId = dogForm.dataset.id;
        const formData = new FormData(dogForm);
        const updatedDog = {
            name: formData.get('name'),
            breed:formData.get('breed'),
            sex: formData.get('sex')
        };
        try {
            await fetch(`https://pseudo-data.onrender.com/dogs/${dogId}`, { 
                method: 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(updatedDog)
            });

            fetchAndRenderDogs();

            dogForm.reset();
            delete dogForm.dataset.id;

        } catch (error) {
            console.error(' Error updating dog:', error);


        }
    });
});