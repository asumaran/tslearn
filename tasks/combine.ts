type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const mergedData: {
    user: number;
    duration: number;
    equipment: Set<string>;
  }[] = [];
  const userSessions = new Map();
  sessions.forEach((session) => {
    if (userSessions.has(session.user)) {
      const us = userSessions.get(session.user);
      // Podemos modificar directamente porque Map almacena referencias a los objetos,
      // no copias. Al obtener el valor con get(), seguimos apuntando al mismo objeto
      // guardado en el Map, así que los cambios afectan al dato original.
      us.duration += session.duration;
      session.equipment.forEach((eq) => {
        us.equipment.add(eq);
      });
    } else {
      const clonedSession = {
        ...session,
        // Usamos set para evitar duplicados
        equipment: new Set(session.equipment),
      };
      userSessions.set(session.user, clonedSession);
      mergedData.push(clonedSession);
    }
  });

  return mergedData.map((s) => ({
    ...s,
    // ordenamos lexicograficamente por defecto.
    equipment: Array.from(s.equipment).sort(),
  }));
}

const sessions = [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];

console.log(mergeData(sessions));

// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
