document.getElementById('verifyManagerBtn').addEventListener('click', async function () {
    const managerId = document.getElementById('managerId').value.trim();
    const emailDisplay = document.getElementById('managerEmailDisplay');
    const submitBtn = document.querySelector('button[type="submit"]');

    if (!managerId) {
        emailDisplay.style.display = 'none';
        emailDisplay.textContent = '';
        return;
    }

    try {
        emailDisplay.style.display = 'block';
        emailDisplay.textContent = '🔍 Looking up email...';

        const response = await fetch(`/auth/manager-email/${encodeURIComponent(managerId)}`);
        const data = await response.json();

        if (response.ok && data.msg) {
            emailDisplay.textContent = `${data.msg}`;
            submitBtn.disabled = false;
        } else {
            emailDisplay.textContent = `Manager not found`;
            submitBtn.disabled = true;
        }
    } catch (error) {
        emailDisplay.textContent = `Error fetching email`;
        submitBtn.disabled = true;
        console.error(error);
    }
});