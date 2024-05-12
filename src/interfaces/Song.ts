import MusicianDTO from "@/interfaces/Musician";

interface SongDTO {
    name: string;
    gem: string;
    start_date: string;
    end_date: string;
    week:number;
    release_year: number;
    genre: string;
    album: string;
    youtube: string;
    musicians: MusicianDTO[];
    id: number;
}

export default SongDTO;