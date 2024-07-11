document.addEventListener('DOMContentLoaded', function() {
    const passwordElement = document.getElementById('password');
    const toast = document.getElementById('toast');
    const countdownElement = document.getElementById('countdown');
    
    const defaultLength = 15;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generatePassword(length) {
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    function updatePassword() {
        // Display "Generating..." message
        passwordElement.textContent = 'Generating...';
        
        setTimeout(() => {
            const password = generatePassword(defaultLength);
            passwordElement.textContent = password;
            resetCountdown();
        }, 500); // Delay in milliseconds before generating new Password
    }

    function resetCountdown() {
        let countdown = 20;
        countdownElement.textContent = `Next Password in: ${countdown}s`;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `Next Password in: ${countdown}s`;
            if (countdown === 0) {
                clearInterval(countdownInterval); // Clear the interval
                updatePassword(); // Generate new Password after countdown expires
            }
        }, 1000);
    }

    function showToast() {
        $(toast).toast({ delay: 2000 });
        $(toast).toast('show');
    }

    window.copyPassword = function() {
        const passwordText = passwordElement.textContent;
        navigator.clipboard.writeText(passwordText).then(() => {
            showToast();
        });
    };

    window.generateCSV = function() {
        const passwordCount = parseInt(document.getElementById('passwordCount').value, 10);
        if (isNaN(passwordCount) || passwordCount <= 0) {
            alert('Please enter a valid number of passwords.');
            return;
        }

        const csvContent = Array.from({ length: passwordCount }, () => generatePassword(defaultLength)).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'generated_passwords.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    updatePassword(); // Initial call to display Password immediately
});
