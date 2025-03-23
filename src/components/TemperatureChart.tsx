import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { formatDate } from "../utils/dataFormatter";

interface TemperatureChartProps {
  data: ChartData[];
  unit: TemperatureUnit;
  startDate: Date;
  endDate: Date;
  country: string;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  data,
  unit,
  startDate,
  endDate,
  country,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set dimensions and margins
    const margin = { top: 50, right: 50, bottom: 70, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([
        (d3.min(data, (d) => d.temperature) as number) - 2,
        (d3.max(data, (d) => d.temperature) as number) + 2,
      ])
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(data.length > 50 ? 10 : 7))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y));

    // Add Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#666")
      .text(`Temperature (${unit === "celsius" ? "°C" : "K"})`)
      .attr("font-weight", "bold")
      .attr("font-size", "12px");

    // Define line generator
    const line = d3
      .line<ChartData>()
      .x((d) => x(d.date))
      .y((d) => y(d.temperature))
      .curve(d3.curveMonotoneX);

    // Add the line path
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    const dots = svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.temperature))
      .attr("r", 3)
      .attr("fill", "orange");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text(
        `Temperature Forecast from ${formatDate(startDate)} to ${formatDate(
          endDate
        )} in ${country}`
      );

    // Add legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 100}, 0)`);

    legend
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 20)
      .attr("y2", 0)
      .attr("stroke", "orange")
      .attr("stroke-width", 2);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 5)
      .text(`Temperature (${unit === "celsius" ? "°C" : "K"})`)
      .style("font-size", "12px")
      .style("fill", "#666");

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.1)");

    // Tooltip events
    dots
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(
            `Date: ${formatDate(d.date)}<br/>` +
              `Temperature: ${d.temperature.toFixed(1)} ${
                unit === "celsius" ? "°C" : "K"
              }`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");

        d3.select(this).attr("r", 5).attr("fill", "#ff5500");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);

        d3.select(this).attr("r", 3).attr("fill", "orange");
      });

    // Clean up function
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [data, unit, startDate, endDate]);

  return (
    <div className="chart-container d-flex justify-content-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TemperatureChart;
