import { useParams } from "react-router-dom";

export function ClusterDetailPage() {
  const { clusterId } = useParams();
  return <div>Cluster `{clusterId}` detail page</div>;
}
