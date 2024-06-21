AFRAME.registerComponent('tree-generator', {
    schema: {
        posX: { type: 'int', default: -45 },     // Posição X fixa inicial
        posZ: { type: 'int', default: -40 },     // Posição Z fixa inicial
        posAltX: { type: 'int', default: 0 },    // Posição para alteração de distancia entre as arvores
        posAltY: { type: 'int', default: 0 },    // Posição para alteração de distancia entre as arvores
        columns: { type: 'int', default: 3 },    // Quantidade de colunas
        quantityTree: { type: 'int', default: 5 } // Quantidade de arvores em cada colunas
    },

    init: function () {
        var sceneEl = this.el.sceneEl;
        const assets = document.querySelector('a-assets').querySelectorAll('a-asset-items');
        const treeModelIds = Array.from(assets).filter((a) => a.id.startsWith("treeModel")).map((t) => "#" + t.getAttribute("id"));
        var backupPosX = this.data.posX;
        var index = 0;

        for (var i = 0; i < this.data.columns; i++) {
            for (var j = 0; j < this.data.quantityTree; j++) {
                const randomPosition = Math.floor(Math.random() * treeModelIds.length);

                this.data.posX += 5 + this.data.posAltX; // Cálculo para distanciar as árvores das outras na linha X
                configureEnvironment()
                if (this.data.posX > 5 || this.data.posX < -21 || ((this.data.posZ > 8 || this.data.posZ < -7) && this.data.posX > -19 && this.data.posX < -5)) {
                    let entity = document.createElement("a-entity");
                    var scale = Math.random() * 0.5 + 0.5;

                    entity.setAttribute('id', "entityTree" + index);
                    entity.setAttribute("class", "grabbable-obj");
                    entity.setAttribute("grabbable", "");
                    entity.setAttribute('visible', true);
                    entity.setAttribute("gltf-model", treeModelIds[randomPosition]);
                    entity.setAttribute('position', { x: this.data.posX + (Math.random() * 3), y: 0, z: this.data.posZ + (Math.random() * 3) });
                    entity.setAttribute('scale', { x: scale, y: scale, z: scale });

                    sceneEl.appendChild(entity);
                    index++;
                }            
            }
            this.data.posX = backupPosX; // Cálculo para o reset da linha x, voltando para a linha inicial
            this.data.posZ += 10 + this.data.posAltY; // Cálculo para pular na próxima coluna   
        }
    }
});


function configureEnvironment() {
    let element = document.getElementById("env");
    let environmentAttribute = element.getAttribute("environment");

    environmentAttribute.active = true;
    environmentAttribute.preset = "default";
    environmentAttribute.seed = "1";
    environmentAttribute.skyType = "atmosphere";
    environmentAttribute.skyColor = "#24b59f";
    environmentAttribute.horizonColor = "#eff9b7"
    environmentAttribute.lighting = "distant";
    environmentAttribute.shadow = "true";
    environmentAttribute.shadowSize = "10";
    environmentAttribute.lightPosition = { "x": 0, "y": 1, "z": -1 };
    environmentAttribute.fog = "0.78";
    environmentAttribute.flatShading= "false";
    environmentAttribute.playArea = "1"
    environmentAttribute.ground = "noise";
    environmentAttribute.groundYScale = "4"
    environmentAttribute.groundTexture = "walkernoise";
    environmentAttribute.groundColor = "#8B5A2B";
    environmentAttribute.groundColor2 = "#556B2F";
    environmentAttribute.dressing = "none";
    environmentAttribute.dressingAmount = "10"
    environmentAttribute.dressingColor = "#795449";
    environmentAttribute.dressingScale = "1";
    environmentAttribute.dressingVariance = { "x": 0, "y": 0, "z": 0 };
    environmentAttribute.dressingUniformScale = "true";
    environmentAttribute.dressingOnPlayArea = "0";
    environmentAttribute.grid = "none";
    environmentAttribute.gridColor = "#ccc";

    element.setAttribute("environment", environmentAttribute)
}