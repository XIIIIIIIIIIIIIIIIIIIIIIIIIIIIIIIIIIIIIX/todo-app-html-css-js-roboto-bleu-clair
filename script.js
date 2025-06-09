// Éléments DOM
        const taskInput = document.getElementById('new-task-input');
        const addButton = document.getElementById('add-task-btn');
        const taskList = document.getElementById('taskList');
        
        // Générer ID unique
        function generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }
        
        // Ajouter tâche lorsque le bouton est cliqué
        addButton.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if(taskText) {
                addTaskToList(taskText);
                taskInput.value = '';
            }
        });
        
        // Ajouter tâche lors de la pression Entrée
        taskInput.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                addButton.click();
            }
        });
        
        // Ajout d'une tâche à la liste
        function addTaskToList(taskText) {
            const taskId = generateId();
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.setAttribute('data-id', taskId);
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <div class="task-text">${taskText}</div>
                <button class="delete-btn">Supprimer</button>
            `;
            taskList.appendChild(taskItem);
            
            // Animation d'apparition
            setTimeout(() => taskItem.style.opacity = 1, 10);
            
            // Setup des événements
            setupTaskEvents(taskItem);
        }
        
        // Configuration des événements pour une tâche
        function setupTaskEvents(taskItem) {
            // Case à cocher
            const checkbox = taskItem.querySelector('.task-checkbox');
            const taskText = taskItem.querySelector('.task-text');
            
            checkbox.addEventListener('change', () => {
                taskText.classList.toggle('completed', checkbox.checked);
            });
            
            // Bouton Supprimer
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                taskItem.classList.add('removing');
                setTimeout(() => taskItem.remove(), 300);
            });
        }