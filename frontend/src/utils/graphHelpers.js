import * as d3 from 'd3';

export const findConnectedLinks = (nodeId, selector = '.link') => {
  return d3.selectAll(selector).filter(function () {
    const linkData = d3.select(this).data()[0];
    return linkData.source.id === nodeId || linkData.target.id === nodeId;
  });
};

export const findConnectedNodes = (nodeId, selector = '.node') => {
  return d3.selectAll(selector).filter(function () {
    const nodeData = d3.select(this).data()[0];
    const isConnected = d3
      .selectAll('.link')
      .data()
      .some(
        link =>
          (link.source.id === nodeId && link.target.id === nodeData.id) ||
          (link.target.id === nodeId && link.source.id === nodeData.id)
      );
    return isConnected || nodeData.id === nodeId;
  });
};

export const calculateBoundedPosition = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

export const calculateNodePosition = (value, width, padding) => {
  return calculateBoundedPosition(value, padding, width - padding);
}; 