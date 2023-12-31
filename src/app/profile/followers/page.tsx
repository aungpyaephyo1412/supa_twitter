"use client";
import { AuthLayout, LoadingCircle, FollowingCard } from "~/components";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import AXIOSC from "~/services/AXIOSC";

const ProfileFollowerPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get", "auth", "user", "followers"],
    queryFn: async () => {
      const res = await AXIOSC.get("/auth/followers");
      return res.data;
    },
  });
  return (
    <AuthLayout>
      <main className="w-full md:border-x-[0.5px] border-gray-600">
        <div className="w-full min-h-screen">
          <div className="font-semibold text-gray-50 text-xl sticky top-0 bg-black z-[100000] backdrop-blur bg-black/80 border-b-[0.5px] border-b-gray-600 py-3 px-2 md:px-5">
            <div className="w-fit flex justify-center items-center gap-x-2">
              <Link
                href={"/profile"}
                className="text-xl text-white hover:bg-white/20 p-3 rounded-full"
              >
                <BiArrowBack />
              </Link>
              <div>
                <p className="text-sm text-gray-400">
                  {data?.followers?.length} Follower
                  {data?.followers.length > 1 && "s"}
                </p>
              </div>
            </div>
          </div>
          {isLoading && (
            <div className="w-full my-5 flex justify-center items-center">
              <LoadingCircle />
            </div>
          )}
          <div className="min-h-screen w-full flex-1 flex flex-col gap-y-2 rounded">
            {!isLoading && !data?.followers.length && (
              <div className="text-center py-5 w-full backdrop-blur text-white">
                {" "}
                You have not follower!{" "}
              </div>
            )}
            {data?.followers?.map((follower: { id: number; follower: any }) => (
              <FollowingCard key={follower.id} following={follower} />
            ))}
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default ProfileFollowerPage;
