#!/usr/bin/env python3
import os
import re

def clean_translation(content):
    """Tradução limpa de frases completas"""
    
    # Traduções de frases completas
    phrases = {
        # Frases específicas mencionadas
        "Preto pode't connect at C2": "Preto não pode conectar em C2",
        "Black can't connect at C2": "Preto não pode conectar em C2",
        "White can't connect at C2": "Branco não pode conectar em C2",
        "Alive, mas not the best solution": "Vivo, mas não a melhor solução",
        "White's alive": "Branco está vivo",
        "Black's alive": "Preto está vivo",
        "Even if Black connects at A next, White's already alive in seki": "Mesmo se preto conectar em A depois, branco já está vivo em seki",
        "It' a ko, mas Preto pode fazer melhor": "É um ko, mas preto pode fazer melhor",
        "It's a ko, mas Preto pode fazer melhor": "É um ko, mas preto pode fazer melhor",
        "It is a ko, mas Preto pode fazer melhor": "É um ko, mas preto pode fazer melhor",
        
        # Padrões comuns
        "Black can't": "Preto não pode",
        "White can't": "Branco não pode",
        "Black can": "Preto pode",
        "White can": "Branco pode",
        "Black is": "Preto é",
        "White is": "Branco é",
        "Black's": "Preto está",
        "White's": "Branco está",
        "Black has": "Preto tem",
        "White has": "Branco tem",
        "Black will": "Preto vai",
        "White will": "Branco vai",
        "Black should": "Preto deveria",
        "White should": "Branco deveria",
        "Black must": "Preto deve",
        "White must": "Branco deve",
        "Black needs": "Preto precisa",
        "White needs": "Branco precisa",
        "Black gets": "Preto obtém",
        "White gets": "Branco obtém",
        "Black makes": "Preto faz",
        "White makes": "Branco faz",
        "Black takes": "Preto toma",
        "White takes": "Branco toma",
        "Black gives": "Preto dá",
        "White gives": "Branco dá",
        "Black comes": "Preto vem",
        "White comes": "Branco vem",
        "Black goes": "Preto vai",
        "White goes": "Branco vai",
        "Black sees": "Preto vê",
        "White sees": "Branco vê",
        "Black knows": "Preto sabe",
        "White knows": "Branco sabe",
        "Black thinks": "Preto pensa",
        "White thinks": "Branco pensa",
        "Black wants": "Preto quer",
        "White wants": "Branco quer",
        "Black needs": "Preto precisa",
        "White needs": "Branco precisa",
        "Black likes": "Preto gosta",
        "White likes": "Branco gosta",
        "Black uses": "Preto usa",
        "White uses": "Branco usa",
        "Black finds": "Preto encontra",
        "White finds": "Branco encontra",
        "Black works": "Preto funciona",
        "White works": "Branco funciona",
        "Black plays": "Preto joga",
        "White plays": "Branco joga",
        "Black helps": "Preto ajuda",
        "White helps": "Branco ajuda",
        "Black tries": "Preto tenta",
        "White tries": "Branco tenta",
        "Black looks": "Preto olha",
        "White looks": "Branco olha",
        "Black feels": "Preto sente",
        "White feels": "Branco sente",
        "Black seems": "Preto parece",
        "White seems": "Branco parece",
        "Black becomes": "Preto torna-se",
        "White becomes": "Branco torna-se",
        "Black leaves": "Preto deixa",
        "White leaves": "Branco deixa",
        "Black puts": "Preto coloca",
        "White puts": "Branco coloca",
        "Black tells": "Preto diz",
        "White tells": "Branco diz",
        "Black asks": "Preto pergunta",
        "White asks": "Branco pergunta",
        "Black shows": "Preto mostra",
        "White shows": "Branco mostra",
        "Black turns": "Preto vira",
        "White turns": "Branco vira",
        "Black moves": "Preto move",
        "White moves": "Branco move",
        "Black lives": "Preto vive",
        "White lives": "Branco vive",
        "Black brings": "Preto traz",
        "White brings": "Branco traz",
        "Black happens": "Preto acontece",
        "White happens": "Branco acontece",
        "Black writes": "Preto escreve",
        "White writes": "Branco escreve",
        "Black provides": "Preto fornece",
        "White provides": "Branco fornece",
        "Black sits": "Preto senta",
        "White sits": "Branco senta",
        "Black stands": "Preto fica em pé",
        "White stands": "Branco fica em pé",
        "Black loses": "Preto perde",
        "White loses": "Branco perde",
        "Black pays": "Preto paga",
        "White pays": "Branco paga",
        "Black meets": "Preto encontra",
        "White meets": "Branco encontra",
        "Black includes": "Preto inclui",
        "White includes": "Branco inclui",
        "Black continues": "Preto continua",
        "White continues": "Branco continua",
        "Black sets": "Preto define",
        "White sets": "Branco define",
        "Black learns": "Preto aprende",
        "White learns": "Branco aprende",
        "Black changes": "Preto muda",
        "White changes": "Branco muda",
        "Black leads": "Preto lidera",
        "White leads": "Branco lidera",
        "Black understands": "Preto entende",
        "White understands": "Branco entende",
        "Black watches": "Preto observa",
        "White watches": "Branco observa",
        "Black follows": "Preto segue",
        "White follows": "Branco segue",
        "Black stops": "Preto para",
        "White stops": "Branco para",
        "Black creates": "Preto cria",
        "White creates": "Branco cria",
        "Black speaks": "Preto fala",
        "White speaks": "Branco fala",
        "Black reads": "Preto lê",
        "White reads": "Branco lê",
        "Black allows": "Preto permite",
        "White allows": "Branco permite",
        "Black adds": "Preto adiciona",
        "White adds": "Branco adiciona",
        "Black spends": "Preto gasta",
        "White spends": "Branco gasta",
        "Black grows": "Preto cresce",
        "White grows": "Branco cresce",
        "Black opens": "Preto abre",
        "White opens": "Branco abre",
        "Black walks": "Preto anda",
        "White walks": "Branco anda",
        "Black wins": "Preto ganha",
        "White wins": "Branco ganha",
        "Black offers": "Preto oferece",
        "White offers": "Branco oferece",
        "Black remembers": "Preto lembra",
        "White remembers": "Branco lembra",
        "Black loves": "Preto ama",
        "White loves": "Branco ama",
        "Black considers": "Preto considera",
        "White considers": "Branco considera",
        "Black appears": "Preto aparece",
        "White appears": "Branco aparece",
        "Black buys": "Preto compra",
        "White buys": "Branco compra",
        "Black waits": "Preto espera",
        "White waits": "Branco espera",
        "Black serves": "Preto serve",
        "White serves": "Branco serve",
        "Black dies": "Preto morre",
        "White dies": "Branco morre",
        "Black sends": "Preto envia",
        "White sends": "Branco envia",
        "Black expects": "Preto espera",
        "White expects": "Branco espera",
        "Black builds": "Preto constrói",
        "White builds": "Branco constrói",
        "Black stays": "Preto fica",
        "White stays": "Branco fica",
        "Black falls": "Preto cai",
        "White falls": "Branco cai",
        "Black cuts": "Preto corta",
        "White cuts": "Branco corta",
        "Black reaches": "Preto alcança",
        "White reaches": "Branco alcança",
        "Black kills": "Preto mata",
        "White kills": "Branco mata",
        "Black remains": "Preto permanece",
        "White remains": "Branco permanece",
        "Black suggests": "Preto sugere",
        "White suggests": "Branco sugere",
        "Black raises": "Preto eleva",
        "White raises": "Branco eleva",
        "Black passes": "Preto passa",
        "White passes": "Branco passa",
        "Black sells": "Preto vende",
        "White sells": "Branco vende",
        "Black requires": "Preto exige",
        "White requires": "Branco exige",
        "Black reports": "Preto relata",
        "White reports": "Branco relata",
        "Black decides": "Preto decide",
        "White decides": "Branco decide",
        "Black pulls": "Preto puxa",
        "White pulls": "Branco puxa",
    }
    
    # Aplicar traduções
    for english, portuguese in phrases.items():
        content = content.replace(english, portuguese)
    
    return content

def process_sgf_file(file_path):
    """Processa um arquivo SGF"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar se tem frases em inglês
    if re.search(r'\b(Black|White)\s+(can\'t|can|is|are|was|were|has|have|had|will|would|should|must|may|might|does|did|do|gets|got|get|makes|made|make|takes|took|take|gives|gave|give|comes|came|come|goes|went|go|sees|saw|see|knows|knew|know|thinks|thought|think|wants|wanted|want|needs|needed|need|likes|liked|like|uses|used|use|finds|found|find|works|worked|work|plays|played|play|helps|helped|help|tries|tried|try|looks|looked|look|feels|felt|feel|seems|seemed|seem|becomes|became|become|leaves|left|leave|puts|put|tells|told|tell|asks|asked|ask|shows|showed|show|turns|turned|turn|moves|moved|move|lives|lived|live|brings|brought|bring|happens|happened|happen|writes|wrote|write|provides|provided|provide|sits|sat|sit|stands|stood|stand|loses|lost|lose|pays|paid|pay|meets|met|meet|includes|included|include|continues|continued|continue|sets|set|learns|learned|learn|changes|changed|change|leads|led|lead|understands|understood|understand|watches|watched|watch|follows|followed|follow|stops|stopped|stop|creates|created|create|speaks|spoke|speak|reads|read|allows|allowed|allow|adds|added|add|spends|spent|spend|grows|grew|grow|opens|opened|open|walks|walked|walk|wins|won|win|offers|offered|offer|remembers|remembered|remember|loves|loved|love|considers|considered|consider|appears|appeared|appear|buys|bought|buy|waits|waited|wait|serves|served|serve|dies|died|die|sends|sent|send|expects|expected|expect|builds|built|build|stays|stayed|stay|falls|fell|fall|cuts|cut|reaches|reached|reach|kills|killed|kill|remains|remained|remain|suggests|suggested|suggest|raises|raised|raise|passes|passed|pass|sells|sold|sell|requires|required|require|reports|reported|report|decides|decided|decide|pulls|pulled|pull)\b', content, re.IGNORECASE):
        print(f'Traduzindo frases em {file_path}...')
        content = clean_translation(content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_dir = 'content/sgfs/tsumego'
    fixed_count = 0
    
    # Processar todos os arquivos SGF
    for filename in os.listdir(base_dir):
        if filename.endswith('.sgf'):
            file_path = os.path.join(base_dir, filename)
            if process_sgf_file(file_path):
                fixed_count += 1
    
    print(f'Tradução limpa concluída em {fixed_count} arquivos')

if __name__ == '__main__':
    main()
