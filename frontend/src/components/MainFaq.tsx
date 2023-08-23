import React from "react";

import Question from "./ui/Question";
export default function MainFaq() {
  return (
    <section className="mt-20 py-2 w-full mx-auto flex flex-col ">
      <div className=" flex gap-3 w-full items-center text-import-color text-2xl md:text-4xl font-extrabold leading-[30px] md:leading-[60px] tracking-[-0.6px]">
        <h3>FAQ</h3>
        <div className="h-1 w-full bg-import-color border"> </div>
      </div>
      <h4 className="text-[20px] mt-4 md:mt-8 md:text-[40px] font-extrabold leading-[25px] md:leading-[50px] tracking-[-0.6px]">
        자주 묻는 질문
      </h4>
      <div className="md:mt-8 mt-4 flex flex-col md:gap-3 gap-2">
        <Question title={"어떤 프로젝트를 주로 진행하나요?"} isFirst={true}>
          현재 웹, 앱에 집중해 프로젝트를 진행할 예정입니다. 또한 단순히 개발만은 하는것이 아니라 서비스를 해보고
          유지보수를 해보는 방향을 지향합니다.
        </Question>
        <Question title={"활동 요일이 어떻게 되나요?"}>
          팀프로젝트가 주된 활동이기때문에 해당 팀원분들과 일정을 맞추어 활동해주시면 됩니다. 강의가 이루어지는날은
          지정된 요일이 아니라 해당 강의를 강의하시는 분 일정에 따라 변동됩니다.
        </Question>
        <Question title={"프로젝트에 참여하고싶은데 어떻게 해야할지 모르겠어요"}>
          먼저 프레임워크에 대해 모르고 있다면 프론트(ex. React.js) 또는 백엔드(ex.spring,nodejs) 중 원하시는 걸 선택
          하신 후 무료 강의로 클론 코딩 프로젝트를 해보시는걸 추천 드려요. 이후에 동아리에서 진행하는 사이드 프로젝트를
          참여하면 좋을 것같아요 :)
          <br />
          <br /> 만약 프레임워크에 대해 알고있고 클론코딩 프로젝트 정도를 해보았다면 매 학기마다 동아리 주도로 진행하는
          프로젝트에 지원 후 참여하시거나 추후에 오픈할 구인구직 게시판에서 부원분들이 진행하는 프로젝트에 참여하면
          좋을것 같습니다
        </Question>
        <Question title="코딩에 대해 아무것도 모르는데 들어가도 될까요?">
          열정이 가득하시다면 가입 후 배우시면 됩니다!단, 해당 동아리는 개발을 하는 분들의 커뮤니티를 통해 여러
          프로젝트가 진행되는 것을 지향하고 있기 때문에 학원과 같이 수업이 진행되거나 하지는 않습니다.
          <br />
          <br />
          하지만 임원진으로 활동하게 된다면 개발, 그외 부분에 대해서도 교육이 이루어지고 있습니다. 열정을 가지고
          계시다면 임원진에 지원해주세요!
        </Question>
      </div>
    </section>
  );
}
