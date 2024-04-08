import { useCommits } from "./useCommits";
import { configuration } from "../../constants/config";
import CommitListElement from "../../components/CommitListElement";
import PrimaryButton from "../../components/PrimaryButton";

const CommitsPage: React.FC = () => {
  const { data, error, status, page, hasMore, loadNextPage, loadPrevPage } =
    useCommits(
      configuration.GITHUB_OWNER,
      configuration.GITHUB_REPO,
      configuration.PAGE_LIMIT
    );
  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GitHub Commit Explorer</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {status === "pending" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error: {error?.message}</div>
        ) : (
          data?.map((commit) => (
            <CommitListElement
              key={commit.sha}
              commit={commit}
              owner={configuration.GITHUB_OWNER}
              repo={configuration.GITHUB_REPO}
            />
          ))
        )}
        {!hasMore && (
          <div className="flex justify-center">
            <p className="text-gray-500">No more commits to load</p>
          </div>
        )}
      </main>
      {hasMore || page !== 1 ? (
        <div className="mt-6 flex justify-between p-2">
          <PrimaryButton onClick={loadPrevPage} disabled={page === 1}>
            Prev
          </PrimaryButton>
          <PrimaryButton onClick={loadNextPage} disabled={!hasMore}>
            Next
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
};

export default CommitsPage;
