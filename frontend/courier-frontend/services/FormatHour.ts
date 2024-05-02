export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};

export const formatHour = (dateString: string) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`
};
