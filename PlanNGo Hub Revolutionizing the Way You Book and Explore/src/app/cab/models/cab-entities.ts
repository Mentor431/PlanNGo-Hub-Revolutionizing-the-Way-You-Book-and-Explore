export interface cabs{
      id: string
      driverName: string
      type: string,
      fareEstimate: number
      location: string
      available: true,
      seater:number
      image:string[]
      dropLocation: string
      estimatedTime:number
      pinGenerated: number
      contactNumber: number
      carNumber:string
      reviews: [
        {
          user: string
          comment: string
          rating: number
        },
      ],
      rating: number
    }


    export interface Booking {
      id: string;
      date: string;
      contactNumber: string;
      status: string;
      firstname: string;
      lastname: string;
      gender: string;
      type: string,
      location:string,
      cab: cabs;  
      users: User[]; 
    }
    

  export interface faqs{
      question: string;
      answer: string;
    }
 
    export interface User {
      id:string;
      firstname: string;
      midname:string;
      lastname: string;
      gender: string;
      date: string;
      contactNumber: string;
       
    }