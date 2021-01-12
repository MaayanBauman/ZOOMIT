import { format } from 'date-fns';

const formatDate = (date: Date): string => {
    return format(new Date(date), 'dd.MM.yyyy')
}

export const formatTime = (date: Date): string => {
    return format(new Date(date), 'HH:mm');
}

export const formatDayName = (date: Date): string => {
    return date.toLocaleDateString('he-IL', { 'weekday': 'long' });
}

const ISOformatDateIndicator = 'T';
export const truncateDate = (dateInISO: string): Date => {
    return new Date(dateInISO.split(ISOformatDateIndicator)[0])
}

export default formatDate;