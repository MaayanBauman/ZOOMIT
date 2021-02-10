import Event from 'models/Event/Event';
export interface useZoomerPageOutCome {
    startDate: Date | null, 
    setStartDate: Function,
    endDate: Date | null,
    setEndDate: Function,
    handleDateChange: Function,
    eventName: string,
    setEventName: Function,
    categoryId: string | undefined,
    setCategoryId: Function,
    description: string,
    setDescription: Function,
    link: string,
    setLink: Function,
    price: number,
    setPrice: Function,
    maxRegisters: number,
    setMaxRegisters: Function,
    zoomPass: string,
    setZoomPass: Function,
    createEvent: Function,
    updateEvent: Function
}

export interface useZoomerPageInCome {
    currEvent? : Event
}