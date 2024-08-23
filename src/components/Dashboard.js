import React, { useState } from "react";
import MetricCard from "./MetricCard";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);

  const metrics = [
    {
      name: "Patient Experience",
      description: `The national average HCAHPS score across nearly 3,300 U.S. hospitals tracked in HospitalView is 3.33.
         The Oklahoma state average is 3.76`,
      nationalAvg: 3.33,
      stateAvg: 3.76,
      doctorAvg: 3.5,
      type: "bar",
      reference: [
        {
          link: "https://www.definitivehc.com/resources/healthcare-insights/hcahps-scores-state#:~:text=What%20is%20the%20average%20HCAHPS,tracked%20in%20HospitalView%20is%203.33.",
          linkDesc: "HCAHPS scores",
        },
      ],
    },
    {
      name: "Quality",
      description: `Quality measures indicate a reduction in hospital-acquired infections (HAIs), with 
a 14% decrease in central line-associated bloodstream infections (CLABSIs) in 
2023. 
The rate of surgical site infections (SSIs) for select procedures dropped by 9% 
nationally.
Oklahoma hospitals also showed improvements in HAIs, with a 12% reduction in 
CLABSIs. The state has been actively participating in CMS's Hospital Improvement 
Innovation Networks (HIINs), which contributed to these gains. Source: .
`,
      nationalAvg: 78,
      stateAvg: 82,
      doctorAvg: 88,
      type: "bar",
      reference: [
        {
          link: "https://www.cms.gov/medicare/quality/initiatives/hospital-quality-initiative/hospital-compare",
          linkDesc:
            "CMS Hospital Quality Initiative (Centers for Medicare & Medicaid Services)",
        },

        {
          link: "https://www.cdc.gov/nchs/nhcs",
          linkDesc: "National Hospital Care Survey (CDC)",
        },
      ],
    },
    {
      name: "Return to Acute",
      description: `The 30-day all-cause hospital readmission rate remained largely stable in 2020 
compared to previous years, with a slight reduction of 10.2% in the total number 
of readmissions across the U.S. 

Similar to national trends, Oklahoma saw a reduction in readmissions, particularly in 
rural areas where healthcare initiatives targeted reducing acute care returns. Specific 
data shows that rural hospitals in Oklahoma reduced their readmission rates by 
approximately 9.3%.`,
      nationalAvg: 13.9,
      stateAvg: 9.3,
      doctorAvg: 7,
      type: "bar",
      reference: [
        {
          link: "https://hcup-us.ahrq.gov/reports/statbriefs/sb304-readmissions-2016-2020.jsp",
          linkDesc: "Healthcare Cost and Utilization Project (HCUP)",
        },
      ],
    },
    {
      name: "Length of Stay",
      description: `The average length of stay in U.S. hospitals in 2023 was 4.6 days, a slight decrease 
from 4.7 days in 2022. 
In Oklahoma, the average length of stay mirrored national trends at 4.7 days, with 
rural hospitals reporting slightly longer stays due to limited post-acute care 
options.
`,
      nationalAvg: 4.6,
      stateAvg: 4.7,
      doctorAvg: 4.5,
      type: "bar",
      reference: [
        {
          link: "https://www.aha.org/statistics/fast-facts-us-hospitals",
          linkDesc: " American Hospital Association",
        },
        {
          link: "https://www.cms.gov/newsroom/fact-sheets/acute-hospital-care-home-data-release-fact-sheet",
          linkDesc: " CMS Acute Hospital Care at Home Data ",
        },
      ],
    },
  ];

  const handleChartClick = (metric) => {
    setSelectedMetric(metric);
    setShowChartDialog(true);
  };

  const handleMoreInfoClick = (metric) => {
    setSelectedMetric(metric);
    setShowInfoDialog(true);
  };

  return (
    <div className="dashboard">
      {metrics.map((metric, index) => (
        <Card key={index} title={metric.name} className="p-mb-4 p-shadow-4">
          <MetricCard metric={metric} onChartClick={handleChartClick} />
          <Button
            label="More Info"
            icon="pi pi-info-circle"
            className="p-button-text"
            onClick={() => handleMoreInfoClick(metric)}
          />
        </Card>
      ))}

      {/* Info Dialog */}
      <Dialog
        header="Metric Information"
        visible={showInfoDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowInfoDialog(false)}
      >
        {selectedMetric && (
          <div>
            <h2>{selectedMetric.name}</h2>
            <p>{selectedMetric.description}</p>

            {selectedMetric.reference &&
              selectedMetric.reference.map((item, index) => (
                <>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.linkDesc}
                  </a>
                  <br /> <br />
                </>
              ))}

            {/* {selectedMetric.link && (
              <a href={selectedMetric.link} target="_blank" rel="noreferrer">
                {selectedMetric.linkDesc}
              </a>
            )} */}
          </div>
        )}
      </Dialog>

      {/* Chart Dialog */}
      <Dialog
        header="Detailed Chart View"
        visible={showChartDialog}
        style={{ width: "80vw" }}
        onHide={() => setShowChartDialog(false)}
        maximizable
      >
        {selectedMetric && (
          <div style={{ position: "relative", height: "70vh" }}>
            <Chart
              type={selectedMetric.type}
              data={{
                labels: ["National Avg", "State Avg", "Doctor Avg"],
                datasets: [
                  {
                    label: selectedMetric.name,
                    data: [
                      selectedMetric.nationalAvg,
                      selectedMetric.stateAvg,
                      selectedMetric.doctorAvg,
                    ],
                    backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
                  },
                ],
              }}
              options={{
                animation: {
                  duration: 1500,
                  easing: "easeOutBounce",
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={500} // Larger height for detailed view
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Dashboard;
