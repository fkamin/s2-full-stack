# Kubernetes Zadanie 1 - Programowanie full-stack w chmurze obliczeniowej

## Table of Contents
1. [Namespace Creation](#namespace-creation)
2. [Resource Quotas](#resource-quotas)
3. [Pod Creation](#pod-creation)
4. [Deployment and Service](#deployment-and-service)
5. [Horizontal Pod Autoscaler (HPA)](#horizontal-pod-autoscaler-hpa)
6. [Load Testing](#load-testing)
7. [Non-Obligatory Section](#non-obligatory-section)

---

## Namespace Creation

**Manifest: `namespace-zad1.yaml`**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: zad1
```
**Command to apply:**
```bash
kubectl apply -f namespace-zad1.yaml
```

---

## Resource Quotas

**Manifest: `resourcequota-zad1.yaml`**
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: zad1-quota
  namespace: zad1
spec:
  hard:
    pods: "10"
    requests.cpu: "2000m"
    requests.memory: "1.5Gi"
    limits.cpu: "2000m"
    limits.memory: "1.5Gi"
```
**Command to apply:**
```bash
kubectl apply -f resourcequota-zad1.yaml
```

---

## Pod Creation

**Manifest: `worker-pod.yaml`**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: worker
  namespace: zad1
spec:
  containers:
  - name: nginx
    image: nginx:latest
    resources:
      limits:
        memory: "200Mi"
        cpu: "200m"
      requests:
        memory: "100Mi"
        cpu: "100m"
```
**Command to apply:**
```bash
kubectl apply -f worker-pod.yaml
```

---

## Deployment and Service

**Manifest: `php-apache.yaml`**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
  namespace: zad1
spec:
  selector:
    matchLabels:
      run: php-apache
  template:
    metadata:
      labels:
        run: php-apache
    spec:
      containers:
      - name: php-apache
        image: registry.k8s.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: "250Mi"
            cpu: "250m"
          requests:
            memory: "150Mi"
            cpu: "150m"
---
apiVersion: v1
kind: Service
metadata:
  name: php-apache
  namespace: zad1
spec:
  ports:
  - port: 80
  selector:
    run: php-apache
```
**Command to apply:**
```bash
kubectl apply -f php-apache.yaml
```

---

## Horizontal Pod Autoscaler (HPA)

**Manifest: `horizontal-pod-autoscaler.yaml`**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: horizontal-pod-autoscaler
  namespace: zad1
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 6
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```
**Command to apply:**
```bash
kubectl apply -f horizontal-pod-autoscaler.yaml
```

---

## Load Testing

To test autoscaling, generate load using a `busybox` container:
```bash
kubectl run -i --tty load-generator --rm --image=busybox -n zad1 -- \
    /bin/sh -c "while true; do wget -q -O- http://php-apache.zad1.svc.cluster.local; done"
```
**Verify autoscaling:**
```bash
kubectl get hpa horizontal-pod-autoscaler -n zad1
kubectl get pods -n zad1
```



---

## Non-Obligatory Section

### 1. Czy można aktualizować aplikację przy aktywnym HPA?
**Answer:** TAK, możliwa jest aktualizacja aplikacji nawet przy aktywnym autoskalerze HPA.
[Documentation Reference](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

### 2. Strategia rollingUpdate
**Rolling Update Strategy parameters:**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1
```
**Changes to HPA:**
Set `maxReplicas` to 5 to ensure quotas are not exceeded during updates.

**Justification:**
- `maxUnavailable: 1` ensures at least one Pod remains unavailable during updates.
- `maxSurge: 1` limits the creation of additional Pods to avoid exceeding quotas.
- Adjusting `maxReplicas` aligns with quota constraints in `zad1` namespace.
