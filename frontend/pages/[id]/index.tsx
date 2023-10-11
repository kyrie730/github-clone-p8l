import Footer from "@/components/Footer";
import WithAction from "@/components/NavBar";
import ProfileDetail from "@/components/ProfileDetail";
import RepoList from "@/components/RepoList";
import { NextPage } from "next";

const Page: NextPage = () => {
  return <>
    <WithAction>
      <div className='flex p-4 space-x-4 flex-col md:flex-row' style={{backgroundColor: '#fcfcfd'}}>
        <div className='md:w-1/4 py-5' style={{backgroundColor: '#fcfcfd'}}>
          <ProfileDetail />
        </div>
        <div className='md:w-3/4 py-5' style={{backgroundColor: '#fcfcfd'}}>
          <RepoList />
        </div>
      </div>
    </WithAction>
    <Footer />
  </>
};

export default Page;
