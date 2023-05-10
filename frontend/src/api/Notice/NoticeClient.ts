import { NoticeList } from "@/util/type";
export default class NoticeClient {
    async  list():Promise<NoticeList[]|string|null> {
        try{
            const result = await fetch("http://localhost:4000/api/about/notice", {
                method: "GET",
                next: {
                    revalidate: 0
                }
            })
            const data = await result.json();
            return data.item as NoticeList[] | [];
        }catch(err:any){
            console.log(err);
            return "공지사항 목록을 불러오는 도중 발생한 에러!!"
        }
        
      }
}