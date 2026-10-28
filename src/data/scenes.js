import { GameState } from '../engine/state.js';
export const Scenes = {
            "scene_birth_0": {
                title: "บทที่ 1: การเกิดใหม่และการตื่นรู้",
                banner: "👶",
                text: "เสียงลมลอดผ่านรอยแยกของหน้าต่างไม้ คุณลืมตาขึ้นช้า ๆ กลิ่นดินชื้นและฟืนที่กำลังมอดลอยอยู่ในอากาศ สิ่งแรกที่คุณสัมผัสได้คือความรู้สึกแปลกประหลาดของการมีชีวิตอีกครั้ง ฝ่ามือของคุณเล็กเกินกว่าจะจับอะไรได้มั่นคง ภาษาที่ได้ยินฟังดูไม่คุ้นเคย แต่กลับมีบางส่วนที่คุณเริ่มเข้าใจอย่างน่าประหลาด ในความทรงจำมีโลกอีกใบหนึ่ง... ตอนนี้คุณอยู่ที่นี่ และทุกการตัดสินใจจะกำหนดอนาคต",
                choices: [
                    { id: "c_birth_1", title: "สำรวจสิ่งแปลกปลอมข้างเตียง", desc: "พยายามใช้ประสาทสัมผัสวิเคราะห์สิ่งแวดล้อมรอบตัว", effect: () => { GameState.childhoodMemory.curiosity += 2; GameState.stats.int += 1; }, next: "scene_childhood_hub" },
                    { id: "c_birth_2", title: "พยายามสื่อสารและส่งเสียงเรียกครอบครัว", desc: "ทดลองเปล่งเสียงเพื่อทำความเข้าใจกล่องเสียงของร่างใหม่", effect: () => { GameState.childhoodMemory.kindness += 1; GameState.stats.cha += 1; }, next: "scene_childhood_hub" },
                    { id: "c_birth_3", title: "ทดลองควบคุมพลังงานในร่างกายเงียบ ๆ", desc: "ตรวจสอบกระแสมานาหรือพลังจิตที่หลงเหลือจากภพก่อน", effect: () => { GameState.childhoodMemory.ambition += 2; GameState.mana += 10; }, next: "scene_childhood_hub" },
                    { id: "c_birth_4", title: "ทำตัวเป็นเด็กทารกปกติและพักผ่อน", desc: "เก็บสะสมแรงกายและไม่ให้ผู้ใหญ่ผิดสังเกต", effect: () => { GameState.childhoodMemory.caution += 2; GameState.hp += 10; }, next: "scene_childhood_hub" }
                ]
            },
            "scene_childhood_hub": {
                title: "วัยเยาว์แห่งการเติบโต (อายุ 1-11 ปี)",
                banner: "🏡",
                text: "เวลาผ่านไป ร่างกายของคุณเริ่มเติบโตขึ้นตามลำดับ คุณได้เรียนรู้ภาษาและวิถีชีวิตผ่านการทำกิจกรรมประจำวัน ความทรงจำวัยเด็กเริ่มหล่อหลอมตัวตนและทักษะติดตัวของคุณ",
                choices: [
                    { id: "c_child_read", title: "แอบอ่านตำราและเรียนรู้หนังสือเก่า", desc: "อาศัยความทรงจำเดิมศึกษาตัวอักษรและเวทมนตร์พื้นฐาน", req: { int: 11 }, effect: () => { GameState.stats.int += 2; GameState.childhoodMemory.curiosity += 3; GameState.age = 6; }, next: "scene_childhood_hub_2" },
                    { id: "c_child_work", title: "ช่วยครอบครัวทำงานและฝึกร่างกาย", desc: "ช่วยแบกฟืน ตักน้ำ และออกกำลังกายกลางแจ้ง", req: { str: 9 }, effect: () => { GameState.stats.str += 2; GameState.stats.con += 2; GameState.age = 6; }, next: "scene_childhood_hub_2" },
                    { id: "c_child_explore", title: "แอบออกไปสำรวจป่ารอบหมู่บ้าน", desc: "เรียนรู้พืชสมุนไพรและหลบหนีสัตว์ป่าตัวเล็ก", req: { per: 9 }, effect: () => { GameState.stats.dex += 2; GameState.gold += 10; GameState.age = 6; }, next: "scene_childhood_hub_2" },
                    { id: "c_child_social", title: "ผูกมิตรกับเด็กในหมู่บ้านและชาวบ้าน", desc: "สร้างเครือข่ายความสัมพันธ์และเรียนรู้ข่าวสาร", req: { cha: 9 }, effect: () => { GameState.stats.cha += 2; GameState.reputation += 5; GameState.age = 6; }, next: "scene_childhood_hub_2" }
                ]
            },
            "scene_childhood_hub_2": {
                title: "พิธีเติบโตและเข้าสู่วัย 12 ปี",
                banner: "🌟",
                text: "ในที่สุดคุณก็มีอายุครบ 12 ปีเต็ม วันนี้เป็นวันสำคัญ—พิธีปลุกพลังประจำปี ณ ลานกลางหมู่บ้าน ศิลาโบราณส่องประกายตอบสนองต่อจิตวิญญาณของคุณ ระบบวิเคราะห์ศักยภาพประเมินเส้นทางที่เหมาะสมที่สุดจากพฤติกรรมในวัยเด็กของคุณ!",
                choices: [
                    { id: "c_path_mage", title: "เลือกเส้นทาง 'นักเวทวิเคราะห์'", desc: "เพราะคุณหมกมุ่นกับตำราและมีความตั้งใจสูง", req: { int: 13 }, effect: () => { GameState.career = "นักเวทฝึกหัด"; GameState.maxMana += 60; }, next: "scene_path_mage_hub" },
                    { id: "c_path_sword", title: "เลือกเส้นทาง 'นักดาบ / นักรบ'", desc: "เพราะคุณฝึกฝนร่างกายและช่วยงานหนักมาตลอด", req: { str: 11 }, effect: () => { GameState.career = "นักดาบฝึกหัด"; GameState.maxHp += 60; GameState.hp = 160; }, next: "scene_path_sword_hub" },
                    { id: "c_path_merchant", title: "เลือกเส้นทาง 'พ่อค้า / เจรจา'", desc: "เพราะคุณเข้าใจคุณค่าของเงินและการคบค้าสมาคม", req: { cha: 11 }, effect: () => { GameState.career = "พ่อค้าฝึกหัด"; GameState.gold += 250; }, next: "scene_path_merchant_hub" },
                    { id: "c_path_peasant", title: "เลือกเส้นทาง 'ชาวบ้านสันโดษ / ช่างฝีมือ'", desc: "ไม่สนใจสงครามโลก เลือกใช้ชีวิตสงบสุขและสร้างฐานะตนเอง", effect: () => { GameState.career = "ช่างฝีมืออิสระ"; GameState.stats.con += 4; }, next: "scene_path_peasant_hub" }
                ]
            },
            // --- MAGE PATH ---
            "scene_path_mage_hub": {
                title: "หอคอยเวทมนตร์และเส้นทางแห่งปัญญา",
                banner: "🔮",
                text: "ในฐานะนักเวทฝึกหัด คุณได้เข้าศึกษาในหอคอยเวทมนตร์หรือเป็นลูกศิษย์ของจอมเวทอิสระ โลกแห่งมานาและอักขระโบราณเปิดกว้างขึ้น คุณจะเลือกมุ่งเน้นการวิจัยเวทธาตุ โบราณคดี หรือเวทมนตร์ต้องห้ามเพื่อไขความลับ?",
                choices: [
                    { id: "c_mage_research", title: "วิจัยเวทมนตร์ธาตุและมิติขั้นสูง", desc: "ใช้สติปัญญาถอดรหัสตำราโบราณเพื่อสร้างเวทโจมตีรุนแรง", effect: () => { GameState.stats.int += 5; GameState.reputation += 10; }, next: "scene_world_crisis" },
                    { id: "c_mage_combat", title: "ผสานเวทมนตร์เข้ากับการต่อสู้", desc: "ฝึกฝนการร่ายเวทพร้อมเคลื่อนที่ประจันบาน", effect: () => { GameState.stats.str += 3; GameState.stats.dex += 3; }, next: "scene_world_crisis" },
                    { id: "c_mage_forbidden", title: "แอบศึกษาเวทมนตร์วิญญาณและคำสาปมืด", desc: "ค้นหาความลับของการเกิดใหม่และการข้ามมิติ", effect: () => { GameState.traits.push("ผู้รู้ความลับเกิดใหม่"); GameState.stats.wis += 5; }, next: "scene_world_crisis" }
                ]
            },
            // --- SWORD PATH ---
            "scene_path_sword_hub": {
                title: "วิถีแห่งดาบและสนามรบ",
                banner: "⚔️",
                text: "คุณก้าวเข้าสู่กิลด์นักผจญภัยหรือกองทัพอาณาจักร ดาบในมือคือคำตอบของทุกปัญหา การฝึกฝนอย่างหนักทำให้คุณแข็งแกร่งขึ้น ทว่าภัยคุกคามจากดันเจี้ยนและสงครามกำลังคืบคลานเข้ามา",
                choices: [
                    { id: "c_sword_adventurer", title: "รับภารกิจล่ามอนสเตอร์และสำรวจดันเจี้ยน", desc: "สะสมประสบการณ์และชื่อเสียงในฐานะนักผจญภัยแถวหน้า", effect: () => { GameState.stats.str += 4; GameState.gold += 200; }, next: "scene_world_crisis" },
                    { id: "c_sword_knight", title: "เข้าร่วมกองอัศวินพิทักษ์อาณาจักร", desc: "ไต่อันดับยศทหารและปกป้องประชาชนจากอสูรภัยพิบัติ", effect: () => { GameState.stats.con += 4; GameState.reputation += 25; }, next: "scene_world_crisis" },
                    { id: "c_sword_solo", title: "ฝึกฝนเป็นนักดาบอิสระผู้โดดเดี่ยว", desc: "แสวงหาคู่ประลองที่แข็งแกร่งที่สุดในทวีป", effect: () => { GameState.stats.dex += 5; }, next: "scene_world_crisis" }
                ]
            },
            // --- MERCHANT PATH ---
            "scene_path_merchant_hub": {
                title: "เส้นทางพ่อค้ามหาเศรษฐีและการค้าโลก",
                banner: "💰",
                text: "เงินทองและเส้นทางการค้าคืออำนาจที่แท้จริง คุณเริ่มต้นกิจการเล็กๆ จนขยายเครือข่ายการค้าข้ามอาณาจักร การเจรจาและการลงทุนทำให้คุณกุมชะตากรรมของเมืองทั้งเมืองไว้ในมือ",
                choices: [
                    { id: "c_merc_empire", title: "ขยายอาณาจักรการค้าและลงทุนในเหมืองแร่", desc: "สร้างรายได้มหาศาลและจ้างกองกำลังคุ้มกันส่วนตัว", effect: () => { GameState.gold += 1500; GameState.stats.cha += 4; }, next: "scene_world_crisis" },
                    { id: "c_merc_politics", title: "ใช้อิทธิพลทางการเงินแทรกแซงการเมือง", desc: "สนับสนุนขุนนางและควบคุมนโยบายของอาณาจักร", effect: () => { GameState.reputation += 40; GameState.stats.int += 3; }, next: "scene_world_crisis" }
                ]
            },
            // --- PEASANT / ORDINARY PATH ---
            "scene_path_peasant_hub": {
                title: "วิถีชีวิตสามัญชนผู้มีความสุข",
                banner: "🌾",
                text: "คุณปฏิเสธชื่อเสียง เงินทอง และการต่อสู้ เลือกใช้ชีวิตอย่างสงบสุขในหมู่บ้านชนบท ปลูกพืชเวทมนตร์ เปิดโรงเตี๊ยมเล็กๆ หรือดูแลครอบครัว ท่ามกลางความวุ่นวายของโลกภายนอก ชีวิตของคุณเต็มไปด้วยความอบอุ่น",
                choices: [
                    { id: "c_peasant_farm", title: "พัฒนาสวนเกษตรเวทมนตร์และใช้ชีวิตสันโดษ", desc: "เพาะปลูกสมุนไพรหายาก ค้าขายกับชาวบ้านอย่างเรียบง่าย", effect: () => { GameState.gold += 400; GameState.stats.con += 5; }, next: "scene_ordinary_life_loop" },
                    { id: "c_peasant_tavern", title: "เปิดโรงเตี๊ยมและต้อนรับนักเดินทาง", desc: "รับฟังเรื่องเล่าจากนักผจญภัยทั่วสารทิศ ใช้ชีวิตอย่างมีความสุข", effect: () => { GameState.stats.cha += 4; GameState.reputation += 20; }, next: "scene_ordinary_life_loop" }
                ]
            },
            "scene_ordinary_life_loop": {
                title: "ความสงบสุขแห่งสามัญชน",
                banner: "🏡",
                text: "ปีแล้วปีเล่าผ่านไป คุณได้สร้างครอบครัวที่อบอุ่น บ้านหลังน้อย และกิจการที่มั่นคง แม้ภายนอกโลกจะเกิดสงครามหรือประตูมิติเปิดออก แต่คุณเลือกที่จะปกป้องคนที่รักและใช้ชีวิตจนถึงวัยชราอย่างสงบ",
                choices: [
                    { id: "c_end_peasant", title: "ใช้ชีวิตบั้นปลายอย่างมีความสุขและส่งต่อมรดก", desc: "ปิดฉากชีวิตสามัญชนผู้ยิ่งใหญ่ในความทรงจำของผู้คน", effect: () => {}, next: "ending_peasant_life" }
                ]
            },
            // --- WORLD CRISIS & ENDGAME SCENES ---
            "scene_world_crisis": {
                title: "วิกฤตประตูมิติและมหาสงคราม",
                banner: "⚡",
                text: "รอยแยกมิติขนาดมหึมาปรากฏขึ้นบนท้องฟ้า ทวีปสั่นสะเทือน กองทัพอสูรและราชาปีศาจทะลักออกมาจากซากโบราณสถาน อาณาจักรตกอยู่ในภาวะวิกฤตขั้นสูงสุด ทุกคนต่างมองหาผู้กอบกู้ หรือโอกาสในการสร้างตำนานของตนเอง",
                choices: [
                    { id: "c_crisis_refuge", title: "พาครอบครัวหลบภัยและเริ่มต้นใหม่ในชนบท", desc: "สละชื่อเสียงและเงินบางส่วนเพื่อเลือกชีวิตที่สงบแทนการเข้าสงคราม", effect: () => { GameState.gold = Math.max(0, GameState.gold - 20); GameState.reputation = Math.max(0, GameState.reputation - 5); }, next: "scene_ordinary_life_loop" },
                    { id: "c_crisis_hero", title: "ลุกขึ้นสู้ในฐานะ 'ผู้กล้า' ปิดผนึกประตูมิติ", desc: "รวบรวมพรรคพวกและเข้าห้ำหั่นกับราชาปีศาจเพื่อช่วยโลก", req: { str: 15 }, effect: () => {}, next: "ending_hero_saved_world" },
                    { id: "c_crisis_lord", title: "ยึดครองพลังแห่งความมืดและสถาปนาเป็น 'จอมมาร'", desc: "สยบกองทัพอสูรและปกครองทวีปด้วยอำนาจเบ็ดเสร็จ", req: { int: 16 }, effect: () => {}, next: "ending_demon_lord" },
                    { id: "c_crisis_emperor", title: "รวบรวมกำลังพลขึ้นเป็น 'ราชาผู้รวมทวีป'", desc: "นำทัพมนุษย์และเผ่าพันธุ์ต่างๆ เอาชนะสงครามการเมือง", req: { cha: 15 }, effect: () => {}, next: "ending_emperor" },
                    { id: "c_crisis_inventor", title: "ประดิษฐ์อาวุธเวทเทคโนโลยีขั้นสูงปิดรอยแยก", desc: "ใช้ความรู้ทางวิทยาศาสตร์และเวทมนตร์สร้างปาฏิหาริย์", req: { int: 18 }, effect: () => {}, next: "ending_inventor_genius" },
                    { id: "c_crisis_merchant_king", title: "ผูกขาดเสบียงและสร้างอาณาจักรการค้าช่วงสงคราม", desc: "ทำกำไรมหาศาลจากภาวะวิกฤตและขึ้นเป็นราชาการค้า", req: { gold: 1000 }, effect: () => {}, next: "ending_merchant_king" }
                ]
            },
            // --- ENDINGS (10 Distinct Endings) ---
            "ending_peasant_life": {
                title: "ฉากจบ: สามัญชนผู้มีความสุข",
                banner: "🌅",
                text: "คุณใช้ชีวิตอย่างเรียบง่ายจนถึงวัยชรา ท่ามกลางลูกหลานและมิตรสหาย แม้ไม่ได้กอบกู้โลกหรือมีชื่อเสียงในพงศาวดาร แต่ความสุขและความอบอุ่นที่คุณสร้างขึ้นคือสิ่งที่มีค่าที่สุดในการเกิดใหม่ครั้งนี้",
                isEnding: true, endingId: "end_peasant"
            },
            "ending_hero_saved_world": {
                title: "ฉากจบ: ผู้กล้าผู้กอบกู้โลก",
                banner: "👑",
                text: "ด้วยความกล้าหาญและพลังอันไร้เทียมทาน คุณสามารถปิดผนึกรอยแยกมิติและสังหารราชาปีศาจลงได้ ชื่อของคุณถูกจารึกไว้ในพงศาวดารแห่งโลกใหม่ในฐานะ 'ผู้กล้าในตำนาน' ผู้ช่วยชีวิตมวลมนุษยชาติ",
                isEnding: true, endingId: "end_hero"
            },
            "ending_demon_lord": {
                title: "ฉากจบ: จอมมารผู้ครอบครองทวีป",
                banner: "😈",
                text: "คุณปฏิเสธที่จะเป็นวีรบุรุษของมนุษย์ และเลือกใช้พลังความมืดสยบทั้งเผ่าพันธุ์มนุษย์และปีศาจ บัลลังก์แห่งความมืดถูกสร้างขึ้นด้วยมือคุณ กลายเป็น 'จอมมาร' ผู้ปกครองทวีปด้วยความยำเกรง",
                isEnding: true, endingId: "end_demons"
            },
            "ending_emperor": {
                title: "ฉากจบ: จักรพรรดิผู้รวมทวีป",
                banner: "🏰",
                text: "ด้วยกลยุทธ์การเมือง การทูต และกองกำลังที่แข็งแกร่ง คุณสามารถยุติสงครามร้อยปีและหลอมรวมอาณาจักรทั้งหมดให้เป็นหนึ่งเดียว สถาปนาจักรวรรดิอันเกรียงไกรที่ไร้ผู้ต้าน",
                isEnding: true, endingId: "end_emperor"
            },
            "ending_inventor_genius": {
                title: "ฉากจบ: นักประดิษฐ์ผู้เปลี่ยนอารยธรรม",
                banner: "⚙️",
                text: "คุณผสมผสานเวทมนตร์และวิทยาศาสตร์จากโลกเดิม สร้างสรรค์เครื่องจักรเวทและเทคโนโลยีพลิกโฉมหน้าประวัติศาสตร์ มนุษยชาติก้าวเข้าสู่ยุคสมัยใหม่ด้วยมันสมองและสองมือของคุณ",
                isEnding: true, endingId: "end_inventor"
            },
            "ending_merchant_king": {
                title: "ฉากจบ: ราชาแห่งการค้าผู้กุมเศรษฐกิจ",
                banner: "🪙",
                text: "ในยามที่โลกเผชิญวิกฤต คุณใช้เครือข่ายการค้าเข้าควบคุมเสบียงและการเงินทั้งหมด จนกลายเป็นผู้ทรงอิทธิพลที่แท้จริงเหนือราชบัลลังก์และสนามรบ",
                isEnding: true, endingId: "end_merchant"
            }
        };
