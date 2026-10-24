Comentarii în cod: Toate comentariile din fișierele de cod trebuie scrise scurt și clar în limba engleză (standard de industrie).

Codul livrat nu trebuie să conțină placeholder-e de tipul `... rest of code ...`, `// existing code` sau funcții incomplete.

## Arhitectura de Cod (React + Zustand + Tailwind)

Zustand State Management:

Toate modificările de stare din gameStore.js trebuie să fie imutabile (folosind set((state) => ...)).

Inițializează întotdeauna stările cu valori implicite sigure ([], {}, 0, false) pentru a preveni erorile de tip undefined în interfață.

Păstrează logica de calcul (Tick-ul de timp, formulele de oboseală/bug-uri) în interiorul store-ului, nu în componentele React.

Componente React:

O singură responsabilitate per componentă (ex: NeuralTerminal.jsx doar afișează loguri, SchedulePlanner.jsx doar gestionează cele 24 de ore).

Tratează toate cazurile de eroare și stările de încărcare (Edge cases).

Stilizare Tailwind **CSS**:

Păstrează tema Dark / Cyberpunk (fundaluri bg-slate-**950**, text slate-**200**, accente neon cyan-**500**, emerald-**400**, rose-**500**).

Asigură-te că toate butoanele au stare vizuală de disabled (cu opacitate redusă și cursor-not-allowed) când jucătorul nu are suficiente resurse.

## Controlul Calității (QA Check)

Verificare sintactică: Înainte de a confirma finalizarea, asigură-te că toate importurile/exporturile sunt corecte și nu există variabile nedeclarate.

Integritatea Buclei de Joc: Asigură-te că funcția tick() nu provoacă bucle infinite de re-render în React.
