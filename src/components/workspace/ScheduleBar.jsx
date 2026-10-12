import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { useMemo } from 'react';
import { MONTHS_EN } from '../../data/derive';
import { useModel } from '../../data/DataProvider';
import Thumb from './Thumb';

/**
 * Barre noire "Your Schedule" de la maquette, transposée en frise des semestres.
 * Chaque période occupe une largeur proportionnelle à sa durée ; les mois non couverts
 * sont hachurés ; un curseur indique la date du jour.
 */
const today = new Date();
const todayIndex = today.getFullYear() * 12 + today.getMonth() + (today.getDate() - 1) / 31;

export default function ScheduleBar({ selected, onSelect }) {
    const { PERIODS, projectsOfPeriod } = useModel();
    const { MIN, MAX, GAPS } = useMemo(() => {
        const min = Math.min(...PERIODS.map(p => p.start));
        const max = Math.max(...PERIODS.map(p => p.end));
        // trous entre périodes
        const gaps = PERIODS.reduce((acc, p, i, arr) => {
            const next = arr[i + 1];
            if (next && next.start > p.end) acc.push({ start: p.end, end: next.start });
            return acc;
        }, []);
        return { MIN: min, MAX: max, GAPS: gaps };
    }, [PERIODS]);
    const pct = (i) => `${((i - MIN) / (MAX - MIN || 1)) * 100}%`;
    const showCursor = todayIndex >= MIN && todayIndex <= MAX;
    return (
        <div className="ws-schedule">
            <div className="ws-schedule-head">
                <span className="ws-schedule-title">My Journey</span>
                <span className="ws-schedule-date">
                    <CalendarDays size={15} strokeWidth={1.6} />
                    {today.getDate()} {MONTHS_EN[today.getMonth()]}
                </span>
            </div>

            <div className="ws-track">
                {GAPS.map(g => (
                    <div key={g.start} className="ws-track-gap" style={{ left: pct(g.start), width: `calc(${pct(g.end)} - ${pct(g.start)})` }}
                         title="No reporting period" />
                ))}

                {PERIODS.map(p => {
                    const list = projectsOfPeriod(p.id);
                    const on = selected === p.id;
                    return (
                        <button key={p.id}
                                className={`ws-track-seg ${on ? 'is-on' : ''} ${list.length ? '' : 'is-empty'}`}
                                style={{ left: pct(p.start), width: `calc(${pct(p.end)} - ${pct(p.start)})` }}
                                onClick={() => onSelect(on ? null : p.id)}
                                aria-pressed={on}
                                title={p.title}>
                            {list.length > 0 && (
                                <span className="ws-stack">
                                    {list.slice(0, 3).map(pr => <Thumb key={pr.id} project={pr} size={34} />)}
                                </span>
                            )}
                            <span className="ws-track-label">
                                {p.short}
                                <small>{list.length > 0 ? `${list.length} projects` : 'Coming soon'}</small>
                            </span>
                        </button>
                    );
                })}

                {showCursor && (
                    <div className="ws-cursor" style={{ left: pct(todayIndex) }}>
                        <span>Today</span>
                    </div>
                )}
            </div>

            <button className={`ws-circle ws-circle--dark ${selected == null ? 'is-on' : ''}`}
                    onClick={() => onSelect(null)} title="All periods" aria-label="Show all periods">
                <ArrowUpRight size={18} strokeWidth={1.6} />
            </button>
        </div>
    );
}
