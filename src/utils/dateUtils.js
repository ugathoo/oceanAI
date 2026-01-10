export const formatDisplayDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  export const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
  
    return { daysInMonth, startingDayOfWeek };
  };
  
  export const isSameDay = (date1, date2) => {
    return new Date(date1).toLocaleDateString() === new Date(date2).toLocaleDateString();
  };
  
  export const calculateStreak = (entries) => {
    if (entries.length === 0) return 0;
    
    const sortedDates = [...new Set(entries.map(e => 
      new Date(e.date).toLocaleDateString()
    ))].sort((a, b) => new Date(b) - new Date(a));
  
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      const entryDate = new Date(sortedDates[i]);
      entryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((checkDate - entryDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };