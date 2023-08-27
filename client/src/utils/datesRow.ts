
const datesRow = () => {
    const date = new Date();
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const month: string = months[date.getMonth()];
    const today: number = date.getDate();
}

export default datesRow;