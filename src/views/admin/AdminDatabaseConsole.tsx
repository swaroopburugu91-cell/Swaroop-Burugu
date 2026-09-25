import React, { useState } from 'react';
import { dbService } from '../../services/db';
import { AppDatabase } from '../../types';
import {
  Database,
  Terminal,
  Download,
  RotateCcw,
  Table as TableIcon,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const AdminDatabaseConsole: React.FC = () => {
  const db = dbService.getSnapshot();
  const tables = Object.keys(db) as (keyof AppDatabase)[];

  const [selectedTable, setSelectedTable] = useState<keyof AppDatabase>('bible_messages');
  const [sqlQuery, setSqlQuery] = useState(`SELECT * FROM bible_messages WHERE category = 'Faith'`);
  const [queryResult, setQueryResult] = useState<{ columns: string[]; rows: any[]; message?: string; error?: string } | null>(null);
  const [dumpText, setDumpText] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState(false);

  const handleRunQuery = () => {
    const res = dbService.executeSQLQuery(sqlQuery);
    setQueryResult(res);
  };

  const handleExportSQL = () => {
    const sql = dbService.exportSQLDump();
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `christ_world_database_dump_${Date.now()}.sql`;
    a.click();
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(db, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `christ_world_database_${Date.now()}.json`;
    a.click();
  };

  const handleResetSeed = () => {
    if (window.confirm('Reset database to clean initial project seed state? All test additions will be restored to defaults.')) {
      dbService.resetToSeed();
      setResetNotice(true);
      setTimeout(() => setResetNotice(false), 3000);
    }
  };

  // Raw records of currently selected table
  const currentTableData = Array.isArray(db[selectedTable])
    ? (db[selectedTable] as any[])
    : [db[selectedTable]];

  const columns = currentTableData.length > 0 ? Object.keys(currentTableData[0]) : [];

  return (
    <div className="space-y-8 text-xs text-slate-300">
      
      {/* Engineering Project Banner */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            <Database className="w-4 h-4" />
            <span>Final-Year Engineering Project Component</span>
          </div>
          <h2 className="text-xl font-bold font-cinzel text-white mt-1">
            Relational Database Console & Query Engine
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            18 Relational tables with foreign key references, audit timestamps, and SQL query parser for viva demonstration.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportSQL}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center space-x-1.5 border border-slate-700 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export SQL Dump</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center space-x-1.5 border border-slate-700 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleResetSeed}
            className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-xl font-semibold flex items-center space-x-1.5 border border-red-800/60"
            title="Reset to clean demonstration seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {resetNotice && (
        <div className="p-3 bg-emerald-900/40 border border-emerald-600/60 text-emerald-300 rounded-xl">
          Database successfully refreshed to project seed state!
        </div>
      )}

      {/* SQL Query Interactive Terminal */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold font-cinzel">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Live SQL Query Terminal</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Supported: SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={sqlQuery}
            onChange={e => setSqlQuery(e.target.value)}
            placeholder="SELECT * FROM bible_messages WHERE category = 'Faith'"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 font-mono text-emerald-300 text-xs focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleRunQuery}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 shrink-0 shadow"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Execute SQL</span>
          </button>
        </div>

        {/* Preset query examples */}
        <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 items-center">
          <span className="font-semibold text-slate-500">Quick queries:</span>
          <button
            onClick={() => { setSqlQuery('SELECT * FROM bible_messages ORDER BY views_count DESC'); handleRunQuery(); }}
            className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded font-mono text-slate-300"
          >
            Popular Sermons
          </button>
          <button
            onClick={() => { setSqlQuery('SELECT * FROM courses WHERE level = "Certificate"'); handleRunQuery(); }}
            className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded font-mono text-slate-300"
          >
            Certificate Courses
          </button>
          <button
            onClick={() => { setSqlQuery('SELECT * FROM events ORDER BY date ASC'); handleRunQuery(); }}
            className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded font-mono text-slate-300"
          >
            Upcoming Events
          </button>
        </div>

        {/* Query Output Table */}
        {queryResult && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2 mt-4">
            <div className="flex justify-between items-center text-[11px]">
              {queryResult.error ? (
                <span className="text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{queryResult.error}</span>
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{queryResult.message}</span>
                </span>
              )}
            </div>

            {queryResult.rows.length > 0 && (
              <div className="overflow-x-auto max-h-60 mt-2">
                <table className="w-full text-left font-mono text-[11px] text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      {queryResult.columns.map(col => (
                        <th key={col} className="p-2 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {queryResult.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/60">
                        {queryResult.columns.map(col => (
                          <td key={col} className="p-2 whitespace-nowrap text-slate-300">
                            {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Relational Table Browser */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center space-x-2 text-white font-bold font-cinzel">
            <TableIcon className="w-4 h-4 text-amber-400" />
            <span>Table Schema & Records Inspector</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {currentTableData.length} records in <strong className="text-amber-400 font-mono">{selectedTable}</strong>
          </span>
        </div>

        {/* Table Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {tables.map(tbl => (
            <button
              key={tbl}
              onClick={() => setSelectedTable(tbl)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                selectedTable === tbl
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tbl}
            </button>
          ))}
        </div>

        {/* Table Data Viewer */}
        <div className="overflow-x-auto max-h-96 rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left font-mono text-[11px] text-slate-300">
            <thead className="bg-slate-900 text-amber-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                {columns.map(col => (
                  <th key={col} className="p-2.5 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {currentTableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50">
                  {columns.map(col => (
                    <td key={col} className="p-2.5 whitespace-nowrap max-w-xs truncate text-slate-300">
                      {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
