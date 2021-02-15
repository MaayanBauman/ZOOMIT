import { format } from 'date-fns';

export const formatDate = (date: any): string => {
    return (
        date 
        ? format(new Date(date), 'dd.MM.yyyy')
        : ''
    )
}

export const formatTime = (date: any): string => {
    return (
        date
        ? format(new Date(date), 'HH:mm')
        : ''
    )
}

export const formatDayName = (date: any): string => {
    return (
        date
        ? date.toLocaleDateString('he-IL', { 'weekday': 'long' })
        : ''
    )
}

const ISOformatDateIndicator = 'T';
export const truncateDate = (dateInISO: string): Date => {
    return new Date(dateInISO.split(ISOformatDateIndicator)[0])
}

export default formatDate;