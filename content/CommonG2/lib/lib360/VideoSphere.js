
(function($, $t, isImage) {

    var $s = Spin = {

        video : null,
        texture : null,
        camera : null,
        scene : null,
        renderer : null,

        fov : 90,
        maxfov : 145,
        minfov : 30,
        texture_placeholder : null,
        isUserInteracting : false,
        onPointerDownPointerX : 0,
        onPointerDownPointerY : 0,
        onPointerDownLon : 0,
        onPointerDownLat : 0,
        xpos : 0,
        ypos : 0,
        yrotate : 0,
        xrotate : 0,

        init : function() {

            var container, mesh;

            this.video = $('#video')[0];
            this.video.autoplay  = true;
            this.video.loop  = true;

            this.texture = new THREE.Texture(video);
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;
            this.texture.generateMipmaps = false;

            container = $('#spin_container')[0];

            this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1100);
            this.camera.target = new THREE.Vector3(0, 0, 0);

            this.scene = new THREE.Scene();

            mesh = isImage ?
                new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('photo.jpg') }))
                :
                new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({ map: this.texture }));

            mesh.scale.x = -1;
            this.scene.add(mesh);

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            container.appendChild(this.renderer.domElement);

            document.addEventListener('mousedown', $s.onMouseDown, false);
            document.addEventListener('mousemove', $s.onMouseMove, false);
            document.addEventListener('mouseup', $s.onMouseUp, false);
            document.addEventListener('mousewheel', $s.onMouseWheel, false);
            document.addEventListener('DOMMouseScroll', $s.onMouseWheel, false);

            window.addEventListener('resize', $s.onWindowResize, false);
        },

        onWindowResize :function () {

            $s.camera.aspect = window.innerWidth / window.innerHeight;
            $s.camera.updateProjectionMatrix();

            $s.renderer.setSize(window.innerWidth, window.innerHeight);

        },

        onMouseDown : function(e) {

            e.preventDefault();

            $s.isUserInteracting = true;

            $s.onPointerDownPointerX = e.clientX;
            $s.onPointerDownPointerY = e.clientY;

            $s.onPointerDownLon = $s.xpos;
            $s.onPointerDownLat = $s.ypos;
        },

        onMouseMove : function(e) {

            if ($s.isUserInteracting) {
                $s.xpos = ($s.onPointerDownPointerX - e.clientX) * 0.1 + $s.onPointerDownLon;
                $s.ypos = (e.clientY - $s.onPointerDownPointerY) * 0.1 + $s.onPointerDownLat;
            }
        },

        onMouseUp : function(e) {

            $s.isUserInteracting = false;

        },

        onMouseWheel : function(e) {
            var zoomto = $s.fov;

            if (e.wheelDeltaY) {  // WebKit
                zoomto -= e.wheelDeltaY * .05;
            } else if (e.wheelDelta) {    // IE
                zoomto -= e.wheelDelta * .05;
            } else if (e.detail) {    // FF
                zoomto += e.detail * 1;
            }
            if(zoomto > $s.maxfov) zoomto = $s.maxfov;
            if(zoomto < $s.minfov) zoomto = $s.minfov;
            $s.fov = zoomto;

            $s.camera.projectionMatrix.makePerspective($s.fov, window.innerWidth / window.innerHeight, 1, 1100);
            $s.render();

            console.log("ON MOUSEWHEEL :" + $s.fov);
        },

        frameRequest : function() {

            //noinspection JSCheckFunctionSignatures
            window.requestAnimationFrame($s.frameRequest);
            $s.render();
        },

        render : function() {

            if(this.video.readyState === this.video.HAVE_ENOUGH_DATA){
                this.texture.needsUpdate = true;
            }

            $s.ypos = Math.max(-85, Math.min(85, $s.ypos));
            $s.yrotate = (90 - $s.ypos) * Math.PI / 180;
            $s.xrotate = $s.xpos * Math.PI / 180;

            $s.camera.target.x = 500 * Math.sin($s.yrotate) * Math.cos($s.xrotate);
            $s.camera.target.y = 500 * Math.cos($s.yrotate);
            $s.camera.target.z = 500 * Math.sin($s.yrotate) * Math.sin($s.xrotate);

            $s.camera.lookAt($s.camera.target);

            // distortion
            $s.camera.position.x = -$s.camera.target.x;
            $s.camera.position.y = -$s.camera.target.y;
            $s.camera.position.z = -$s.camera.target.z;

            // renderer.clean();
            $s.renderer.render($s.scene, $s.camera);

        }

    };

    function start(e){
        Spin.init();
        Spin.frameRequest();

    }
//    document.addEventListener("DOMContentLoaded", start);
    $(document).ready(start);

})(jQuery, TweenLite, false);