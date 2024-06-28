
interface MusicianDTO {
    id:number,
    name:string,
    photo:string,
    flag:string,
    country:string,
    points:number,
    current_position:number,
    best_position:number,
    rating:number,
    start_date_best_position:string,
    end_date_best_position:string,
    points_semester:number,
    points_year:number,
    award_count:number,
    awards: number[];
}

export default MusicianDTO