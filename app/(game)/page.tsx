
import Section_1 from "../components/swiper/Section_1";
import Section_2 from "../components/swiper/Section_2";
export default function Home() {
  
  return(
    <div className="mt-8 flex flex-col gap-11">
      <Section_1/> 
      <Section_2  platform={187} page_size={8} title="Top Games for PS5" btn="Browse All Games"/>
      <Section_2 platform={21} page_size={8} title="Top Games for Android" btn="Browse All Games"/>
      <Section_2 platform={4} page_size={8} title="Top Games for Pc" btn="Browse All Games"/>
      </div>
  )
}
