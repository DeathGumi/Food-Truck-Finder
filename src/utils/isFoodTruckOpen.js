export function isFoodTruckOpen(hours) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
  
    const [openStr, closeStr] = hours.split(' - ');
    const openTime = convertTimeToMinutes(openStr);
    const closeTime = convertTimeToMinutes(closeStr);
  
    return currentTime >= openTime && currentTime < closeTime;
  }
  
  function convertTimeToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  
    return hours * 60 + minutes;
  }