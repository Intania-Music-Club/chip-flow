

const FormattedDate = ({timeStamp}: {timeStamp: Date}) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
    })
    
    return (
        <span>{formattedDate}</span>
    )
}

export default FormattedDate