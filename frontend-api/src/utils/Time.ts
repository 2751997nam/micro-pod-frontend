class Time {
    public static formatDateToISO(date: Date): string {
        // Get the timezone offset in minutes and convert it to hours and minutes
        const tzOffset = -date.getTimezoneOffset(); // in minutes
        const sign = tzOffset >= 0 ? '+' : '-';
        const offsetHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
        const offsetMinutes = String(Math.abs(tzOffset) % 60).padStart(2, '0');
        // Format the date to ISO 8601 with custom timezone format
        date.setHours(date.getHours() + eval(`${sign}${Math.floor(Math.abs(tzOffset) / 60)}`));
        date.setMinutes(date.getMinutes() + eval(`${sign}${Math.abs(tzOffset) % 60}`));
        const isoString = date.toISOString();
        const formattedDate = isoString.replace('Z', `${sign}${offsetHours}${offsetMinutes}`);

        return formattedDate;
    }
}

export default Time;
