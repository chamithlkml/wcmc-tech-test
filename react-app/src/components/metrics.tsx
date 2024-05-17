const Metrics = ({ metrics }: { metrics: object }) => {
  return (
    <div>
      <pre>{JSON.stringify(metrics)}</pre>
    </div>
  );
}

export default Metrics;