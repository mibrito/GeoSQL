// Torna possível o retorno do map apenas em condicionais.
/* eslint-disable array-callback-return */

import React, { useContext } from 'react';

import { FiDownload } from 'react-icons/fi';

import QueryContext from '../../../contexts/query';

import TabsMenu from '../../../components/TabsMenu';

import './styles.css';

export default function Results() {
   const { results } = useContext(QueryContext);

   return (
      <div id="resultsContainer" className="firstContainer container">
         <header>
            <TabsMenu selectedTab="results" />
         </header>

         <div id="mainContainer" className="container">
            <aside className="container">
               <button className="saveResults">
                  <FiDownload className="saveIcon" />
                  JSON
               </button>
               <button className="saveResults">
                  <FiDownload className="saveIcon" />
                  PDF
               </button>
               <button className="saveResults">
                  <FiDownload className="saveIcon" />
                  TXT
               </button>
               <button className="saveResults">
                  <FiDownload className="saveIcon" />
                  CSV
               </button>
            </aside>
            <section id="tableContainer" className="container">
               {typeof results === 'string' ? (
                  <div id="errorContainer" className="container">
                     <p>Error</p>
                     <p>{results}</p>
                  </div>
               ) : (
                  <table>
                     <thead>
                        <tr>
                           {Object.keys(results[0]).map((column, index) => {
                              if (column !== 'geom' && column !== 'geojson') {
                                 return <th key={index}>{column}</th>;
                              }
                           })}
                        </tr>
                     </thead>
                     <tbody>
                        {results.map((row, index) => {
                           return (
                              <tr key={index}>
                                 {Object.values(row).map((value, index) => {
                                    // A tipagem do typescript não aceita a comparação direta por meio da string 'geom'. Como a tipagem estática não pode ser feita (devido às diferentes colunas que virão em cada resultado), o ts-ignore fez-se necessário).
                                    //@ts-ignore
                                    if (row['geom'] !== value && row['geojson'] !== value)
                                       return <td key={index}>{value}</td>;
                                 })}
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               )}
            </section>
         </div>
      </div>
   );
}
