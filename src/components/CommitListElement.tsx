import moment from "moment";
import { DEFAULT_AVATAR } from "../constants/strings";
import { GithubCommit } from "../types/commit.type";

interface Props {
  commit: GithubCommit;
  owner: string;
  repo: string;
}
const CommitListElement: React.FC<Props> = ({ commit, owner, repo }) => {
  const sha = commit.sha.substring(0, 7);
  return (
    <div key={commit.sha} className="flex mb-2">
      <a
        href={
          commit.author ? `https://github.com/${commit.author.login}` : undefined
        }
      >
        <img
          className="w-8 h-8 rounded-full"
          src={commit.author?.avatar_url ?? DEFAULT_AVATAR}
          alt={commit.author?.login}
        />
      </a>
      <div className="ml-4">
        <div className="text-sm flex gap-4">
          <span className="font-medium">{commit.commit.message}</span>
          <a
            href={`https://github.com/${owner}/${repo}/commit/${sha}`}
            className="text-blue-500 hover:underline"
          >
            {commit.sha.substring(0, 7)}
          </a>
        </div>
        <div className="text-xs text-gray-500">
          <span>{commit.commit.author.name}</span>
          <span className="ml-2">{moment(commit.commit.author.date).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default CommitListElement;
