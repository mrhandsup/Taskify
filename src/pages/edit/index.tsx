import styles from "./edit.module.scss";
import classNames from "classnames/bind";
import DashboradEditTitleBox from "@/components/domains/edit/article/DashboradEditTitleBox";
import DashboradEditMemberBox from "@/components/domains/edit/article/DashboradEditMemberBox";
import Image from "next/image";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

export default function Edit() {
  const router = useRouter();

  function gobackButton() {
    router.back();
  }

  return (
    <BaseContainer currentPath="test">
      <main className={cx("main")}>
        <button type="button" onClick={gobackButton} className={cx("backforward")}>
          <Image src="/assets/icons/ic-arrow-forward.svg" width={20} height={20} alt="뒤로가기" />
          돌아가기
        </button>
        <DashboradEditTitleBox>비브리지</DashboradEditTitleBox>
        <DashboradEditMemberBox isUserNameEdit={true} title="구성원"></DashboradEditMemberBox>
        <DashboradEditMemberBox isUserNameEdit={false} title="초대 내역"></DashboradEditMemberBox>
        <ResponseBtn state="delete" ph={2} fs={1.8}>
          대시보드 삭제하기
        </ResponseBtn>
      </main>
    </BaseContainer>
  );
}
