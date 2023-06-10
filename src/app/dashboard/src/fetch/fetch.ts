export const handleErrorJSON = (response) => {
    if (!response.ok) {
        return response.json()
            .catch(() => {
                throw new Error(response.status.toString());
            })
            .then(({message}) => {
                throw new Error(message || response.status);
            });
    }
    return response.json();
}