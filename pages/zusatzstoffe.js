import MyNavbar from "../components/navbar/MyNavbar"

export default function name() {
return(
<>
<MyNavbar/>
<div className="container">
<div style={{"backgroundColor":"#00000070;"}} className='row p-3 justify-content-center text-white'>
Deklarationspflichtige Zusatzstoffe
1.mit Farbstoff
2.mit Konservierungsstoff
3.mit Antioxidationsmitel
4.mit Geschmacksverstärker 
5.mit Phosphat
6.mit Milcheiweiß 
7.mit Geschwärzt 
8.mit Süßungsmitel 
9.mit Stärke
10.Koffein
11.mit Nitritpökelsalz
Deklarationspflichtige Allergene
A.Glutenhaltiges Getriede (Weizen) 
B.Krebstiere, C. Eier, D. Fische
E.Erdnüsse, F. Soja
G.Milch (Einschließlich Laktose)
H.Schalenfrüchte (Nüsse)
I.Sellerie, J. Senf, K. Sesamsamen 
L.Schwefeldioxid, M. Lupinen
N.Weichtiere X. Pistazien
Y.Walnuss Z. Cocos
W.Grieß O. Kakao
</div>
</div>
</>
)    
}